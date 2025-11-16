const s3Service = require('../services/s3.service');
const { s3Config } = require('../config/s3.config');

/**
 * Get presigned URL for uploading a file
 * POST /api/upload/presigned-url
 * Body: { fileName, fileType, folder }
 */
const getPresignedUrl = async (req, res) => {
  try {
    const { fileName, fileType, folder = 'medical-records' } = req.body;

    // Validate input
    if (!fileName || !fileType) {
      return res.status(400).json({
        success: false,
        error: 'fileName and fileType are required',
      });
    }

    // Check file type
    if (!s3Config.allowedMimeTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        error: `File type not allowed. Allowed types: ${s3Config.allowedMimeTypes.join(', ')}`,
      });
    }

    const result = await s3Service.getPresignedUploadUrl(fileName, fileType, folder);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in getPresignedUrl:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate presigned URL',
    });
  }
};

/**
 * Get presigned URL for downloading/viewing a file
 * GET /api/upload/download-url/:key
 */
const getDownloadUrl = async (req, res) => {
  try {
    const { key } = req.params;
    const { expiresIn = 3600 } = req.query;

    if (!key) {
      return res.status(400).json({
        success: false,
        error: 'File key is required',
      });
    }

    const url = await s3Service.getPresignedDownloadUrl(key, parseInt(expiresIn));

    res.json({
      success: true,
      data: {
        downloadUrl: url,
        expiresIn: parseInt(expiresIn),
      },
    });
  } catch (error) {
    console.error('Error in getDownloadUrl:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate download URL',
    });
  }
};

/**
 * Delete a file from S3
 * DELETE /api/upload/:key
 */
const deleteFile = async (req, res) => {
  try {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({
        success: false,
        error: 'File key is required',
      });
    }

    await s3Service.deleteFile(key);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteFile:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete file',
    });
  }
};

/**
 * Get public URL for a file (if bucket is public)
 * GET /api/upload/public-url/:key
 */
const getPublicUrl = async (req, res) => {
  try {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({
        success: false,
        error: 'File key is required',
      });
    }

    const url = s3Service.getPublicUrl(key);

    res.json({
      success: true,
      data: {
        publicUrl: url,
      },
    });
  } catch (error) {
    console.error('Error in getPublicUrl:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get public URL',
    });
  }
};

module.exports = {
  getPresignedUrl,
  getDownloadUrl,
  deleteFile,
  getPublicUrl,
};
