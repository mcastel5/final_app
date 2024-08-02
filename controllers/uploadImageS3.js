const AWS = require('aws-sdk');
const crypto = require('crypto');
const sharp = require('sharp');

// AWS configuration
const region = 'us-east-2';
const bucketName = 'mz-db-image-upload';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

/**
 * Handles image upload to S3
 * @param {Buffer} imageBuffer - The buffer of the image file
 * @param {string} originalFilename - The original filename of the image
 * @param {string} mimeType - The MIME type of the image
 * @returns {Promise<string>} The URL of the uploaded image
 */
async function uploadImageToS3(imageBuffer, originalFilename, mimeType) {
  try {
    // Generate a unique filename
    const fileExtension = originalFilename.split('.').pop();
    const fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;

    // Resize and optimize the image
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 1024, height: 1024, fit: 'inside' })
      .toBuffer();

    // Set up S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: resizedImageBuffer,
      ContentType: mimeType,
    };

    // Upload to S3
    const uploadResult = await s3.upload(params).promise();

    // Return the URL of the uploaded image
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Failed to upload image');
  }
}

module.exports = { uploadImageToS3 };