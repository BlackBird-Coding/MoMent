const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client, s3Config } = require('../config/s3.config');
const crypto = require('crypto');
const path = require('path');

/**
 * Generate a unique file name to prevent conflicts
 * @param {string} originalName - Original file name
 * @returns {string} - Unique file name
 */
const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);

  // Sanitize filename - remove special characters
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '_');

  return `${sanitizedName}_${timestamp}_${randomString}${ext}`;
};

/**
 * Generate a presigned URL for uploading a file to S3
 * @param {string} fileName - Name of the file
 * @param {string} fileType - MIME type of the file
 * @param {string} folder - Folder path in S3 bucket (e.g., 'medical-records', 'profile-images')
 * @returns {Promise<Object>} - Object containing presigned URL and file key
 */
const getPresignedUploadUrl = async (fileName, fileType, folder = 'uploads') => {
  try {
    // Validate file type
    if (!s3Config.allowedMimeTypes.includes(fileType)) {
      throw new Error(
        `File type ${fileType} not allowed. Allowed types: ${s3Config.allowedMimeTypes.join(', ')}`
      );
    }

    const uniqueFileName = generateUniqueFileName(fileName);
    const key = `${folder}/${uniqueFileName}`;

    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: s3Config.urlExpirationTime,
    });

    return {
      uploadUrl: presignedUrl,
      key: key,
      fileName: uniqueFileName,
      expiresIn: s3Config.urlExpirationTime,
    };
  } catch (error) {
    console.error('Error generating presigned upload URL:', error);
    throw error;
  }
};

/**
 * Generate a presigned URL for downloading/viewing a file from S3
 * @param {string} key - S3 object key
 * @param {number} expiresIn - URL expiration time in seconds
 * @returns {Promise<string>} - Presigned URL
 */
const getPresignedDownloadUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    return presignedUrl;
  } catch (error) {
    console.error('Error generating presigned download URL:', error);
    throw error;
  }
};

/**
 * Delete a file from S3
 * @param {string} key - S3 object key
 * @returns {Promise<void>}
 */
const deleteFile = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    await s3Client.send(command);
    console.log(`File deleted successfully: ${key}`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};

/**
 * Get public URL for an S3 object (if bucket is public)
 * @param {string} key - S3 object key
 * @returns {string} - Public URL
 */
const getPublicUrl = (key) => {
  return `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${key}`;
};

module.exports = {
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
  deleteFile,
  getPublicUrl,
  generateUniqueFileName,
};
