# AWS S3 Image Upload Setup Guide

This guide will help you set up AWS S3 for image and file uploads in the MoMent application.

## Overview

The application uses AWS S3 for storing medical records, receipts, and other images. It implements a secure presigned URL approach where:
1. Frontend requests a presigned URL from the backend
2. Backend generates a secure, temporary URL with AWS credentials
3. Frontend uploads the file directly to S3 using the presigned URL
4. No AWS credentials are exposed to the client

## Prerequisites

- AWS Account
- AWS CLI (optional, for testing)
- Node.js and npm installed

## Step 1: Create an AWS S3 Bucket

1. **Log in to AWS Console**: https://console.aws.amazon.com/

2. **Navigate to S3**: Search for "S3" in the AWS Console search bar

3. **Create a new bucket**:
   - Click "Create bucket"
   - Enter a unique bucket name (e.g., `moment-health-uploads`)
   - Choose your preferred AWS Region (e.g., `us-east-1`, `ap-southeast-1`)
   - Keep "Block all public access" enabled (recommended for security)
   - Enable "Bucket Versioning" (optional, but recommended)
   - Click "Create bucket"

4. **Configure CORS** (if you need to access files from browser):
   - Go to your bucket → Permissions tab → CORS
   - Add the following CORS configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://yourdomain.com"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

## Step 2: Create IAM User and Get Credentials

1. **Navigate to IAM**: In AWS Console, search for "IAM"

2. **Create a new user**:
   - Click "Users" → "Add users"
   - Username: `moment-s3-uploader`
   - Select "Access key - Programmatic access"
   - Click "Next: Permissions"

3. **Set permissions**:
   - Choose "Attach existing policies directly"
   - Click "Create policy"
   - Use the JSON editor and paste:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name"
            ]
        }
    ]
}
```

   - Replace `your-bucket-name` with your actual bucket name
   - Name the policy `MoMentS3UploadPolicy`
   - Click "Create policy"

4. **Attach the policy to the user**:
   - Go back to user creation
   - Refresh the policy list
   - Search for and select `MoMentS3UploadPolicy`
   - Click "Next: Tags" (optional)
   - Click "Next: Review"
   - Click "Create user"

5. **Save credentials**:
   - **IMPORTANT**: Download the CSV or copy the credentials
   - You'll need:
     - Access Key ID
     - Secret Access Key
   - You won't be able to see the Secret Access Key again!

## Step 3: Configure Environment Variables

1. **Copy the example environment file**:
```bash
cp .env.example .env
```

2. **Edit `.env`** and add your AWS credentials:
```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=moment-health-uploads

# Server Configuration
PORT=3001
NODE_ENV=development

# Upload Configuration
MAX_FILE_SIZE=10485760
PRESIGNED_URL_EXPIRATION=3600

# Frontend Configuration
VITE_API_URL=http://localhost:3001
```

3. **Never commit `.env`** to git - it's already in `.gitignore`

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Start the Application

1. **Start the backend server**:
```bash
npm run server
```

The server will start on `http://localhost:3001`

2. **Start the frontend** (in a new terminal):
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or your configured port)

## Step 6: Test the Upload

1. Navigate to the Care screen in the app
2. Click "Upload Medical Receipt or Record"
3. Select an image or PDF file (max 10MB)
4. Watch the upload progress
5. Check your S3 bucket to see the uploaded file

## File Storage Structure

Files are organized in S3 with the following structure:

```
your-bucket-name/
├── medical-records/
│   ├── filename_timestamp_randomhash.jpg
│   ├── filename_timestamp_randomhash.pdf
│   └── ...
├── profile-images/
└── other-folders/
```

## Security Best Practices

1. **Never commit AWS credentials** to git
2. **Use IAM roles** for production (instead of access keys)
3. **Enable bucket versioning** to prevent accidental deletions
4. **Set up lifecycle policies** to automatically delete old files
5. **Enable server-side encryption** for files at rest
6. **Monitor costs** with AWS CloudWatch and billing alerts
7. **Use presigned URLs** with short expiration times (default: 1 hour)

## Troubleshooting

### Upload fails with CORS error
- Check your bucket CORS configuration
- Ensure your frontend origin is listed in AllowedOrigins

### "Access Denied" error
- Verify IAM user has correct permissions
- Check bucket name matches in both IAM policy and .env
- Ensure AWS credentials are correct

### Files not appearing in S3
- Check AWS region is correct in .env
- Verify bucket name is correct
- Check IAM permissions include `s3:PutObject`

### Backend can't start
- Verify all environment variables are set in .env
- Check port 3001 is not already in use
- Ensure AWS credentials are valid

## API Endpoints

The backend provides the following endpoints:

- `POST /api/upload/presigned-url` - Get presigned URL for upload
- `GET /api/upload/download-url/:key` - Get presigned URL for download
- `DELETE /api/upload/:key` - Delete a file
- `GET /api/upload/public-url/:key` - Get public URL (if bucket is public)
- `GET /health` - Health check

## Cost Optimization

AWS S3 pricing includes:
- Storage: ~$0.023 per GB/month
- PUT requests: ~$0.005 per 1,000 requests
- GET requests: ~$0.0004 per 1,000 requests

To optimize costs:
1. Set up lifecycle policies to move old files to cheaper storage (S3 Glacier)
2. Delete unnecessary files
3. Use CloudFront CDN for frequently accessed files
4. Monitor usage with AWS Cost Explorer

## Production Deployment

For production:

1. **Use environment-specific .env files**:
   - `.env.production` for production settings
   - Use AWS Secrets Manager or Parameter Store for credentials

2. **Set up CloudFront** for faster global access

3. **Enable S3 access logs** for security monitoring

4. **Use IAM roles** instead of access keys when deploying to AWS (EC2, Lambda, etc.)

5. **Set up proper backup and disaster recovery**

## Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [S3 Presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)

## Support

If you encounter issues, please check:
1. AWS credentials are valid
2. S3 bucket exists and is accessible
3. IAM permissions are correctly configured
4. CORS is properly set up
5. Environment variables are loaded

For additional help, consult the AWS documentation or create an issue in the repository.
