/**
 * Upload Service for handling file uploads to AWS S3
 * Uses presigned URLs for secure, direct-to-S3 uploads
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface PresignedUrlResponse {
  success: boolean;
  data?: {
    uploadUrl: string;
    key: string;
    fileName: string;
    expiresIn: number;
  };
  error?: string;
}

export interface UploadResult {
  success: boolean;
  data?: {
    key: string;
    fileName: string;
    url: string;
  };
  error?: string;
}

/**
 * Get presigned URL from backend
 */
async function getPresignedUrl(
  fileName: string,
  fileType: string,
  folder: string = 'medical-records'
): Promise<PresignedUrlResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/upload/presigned-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        fileType,
        folder,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get presigned URL');
    }

    return data;
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Upload file directly to S3 using presigned URL
 */
async function uploadToS3(
  presignedUrl: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress: UploadProgress = {
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100),
          };
          onProgress(progress);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(true);
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted'));
    });

    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

/**
 * Main upload function - handles the complete upload flow
 */
export async function uploadFile(
  file: File,
  folder: string = 'medical-records',
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  try {
    // Validate file
    if (!file) {
      return {
        success: false,
        error: 'No file provided',
      };
    }

    // Get presigned URL
    const presignedResponse = await getPresignedUrl(file.name, file.type, folder);

    if (!presignedResponse.success || !presignedResponse.data) {
      return {
        success: false,
        error: presignedResponse.error || 'Failed to get upload URL',
      };
    }

    const { uploadUrl, key, fileName } = presignedResponse.data;

    // Upload to S3
    await uploadToS3(uploadUrl, file, onProgress);

    // Return success with file details
    return {
      success: true,
      data: {
        key,
        fileName,
        url: uploadUrl.split('?')[0], // URL without query params
      },
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  folder: string = 'medical-records',
  onProgress?: (fileIndex: number, progress: UploadProgress) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await uploadFile(
      file,
      folder,
      onProgress ? (progress) => onProgress(i, progress) : undefined
    );
    results.push(result);
  }

  return results;
}

/**
 * Get download URL for a file
 */
export async function getDownloadUrl(key: string): Promise<string | null> {
  try {
    const encodedKey = encodeURIComponent(key);
    const response = await fetch(`${API_BASE_URL}/api/upload/download-url/${encodedKey}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to get download URL');
    }

    return data.data.downloadUrl;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return null;
  }
}

/**
 * Delete a file from S3
 */
export async function deleteFile(key: string): Promise<boolean> {
  try {
    const encodedKey = encodeURIComponent(key);
    const response = await fetch(`${API_BASE_URL}/api/upload/${encodedKey}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to delete file');
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}
