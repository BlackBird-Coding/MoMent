const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// Get presigned URL for uploading
router.post('/presigned-url', uploadController.getPresignedUrl);

// Get presigned URL for downloading
router.get('/download-url/:key', uploadController.getDownloadUrl);

// Get public URL
router.get('/public-url/:key', uploadController.getPublicUrl);

// Delete file
router.delete('/:key', uploadController.deleteFile);

module.exports = router;
