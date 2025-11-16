const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'AWS_S3_BUCKET_NAME'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(
    `Warning: Missing AWS environment variables: ${missingEnvVars.join(', ')}\n` +
    'Please configure these in your .env file for S3 uploads to work.'
  );
}

// S3 Client Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const s3Config = {
  bucketName: process.env.AWS_S3_BUCKET_NAME || '',
  region: process.env.AWS_REGION || 'us-east-1',
  // Maximum file size (10MB)
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024,
  // Allowed file types
  allowedMimeTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
  ],
  // Presigned URL expiration time (in seconds)
  urlExpirationTime: parseInt(process.env.PRESIGNED_URL_EXPIRATION) || 3600,
};

module.exports = {
  s3Client,
  s3Config,
};
