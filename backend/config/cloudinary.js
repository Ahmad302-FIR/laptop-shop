import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true
});

/**
 * Check if valid Cloudinary credentials are configured
 */
export const isCloudinaryConfigured = () => {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  return Boolean(
    name &&
    key &&
    secret &&
    !name.includes('your_') &&
    !key.includes('your_') &&
    !secret.includes('your_')
  );
};

/**
 * Extract Cloudinary public_id from a full secure URL
 * Example: https://res.cloudinary.com/demo/image/upload/v1612345678/laptop-shop-products/sample.jpg
 * -> laptop-shop-products/sample
 */
export const extractPublicId = (url) => {
  if (!url || typeof url !== 'string') return null;
  if (!url.includes('cloudinary.com')) return null;

  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    let pathAfterUpload = parts[1];
    // Remove version tag like v1612345678/
    pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
    // Remove file extension (.jpg, .png, etc.)
    const lastDotIndex = pathAfterUpload.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      pathAfterUpload = pathAfterUpload.substring(0, lastDotIndex);
    }

    return decodeURIComponent(pathAfterUpload);
  } catch (err) {
    console.warn('Error extracting Cloudinary public_id:', err.message);
    return null;
  }
};

/**
 * Delete an image from Cloudinary by URL or public ID
 */
export const deleteCloudinaryImage = async (urlOrPublicId) => {
  if (!urlOrPublicId || !isCloudinaryConfigured()) return;

  try {
    const publicId = urlOrPublicId.includes('cloudinary.com')
      ? extractPublicId(urlOrPublicId)
      : urlOrPublicId;

    if (!publicId) return;

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.warn(`[Cloudinary Warning] Failed to delete image (${urlOrPublicId}):`, error.message);
  }
};

/**
 * Upload an in-memory buffer to Cloudinary using upload_stream
 * @param {Buffer} buffer - File buffer
 * @param {Object} options - Cloudinary upload options (folder, resource_type, etc.)
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error('Cloudinary credentials are not configured in environment variables.'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'laptop-shop-products',
        resource_type: 'image',
        quality: 'auto:good',
        fetch_format: 'auto',
        ...options
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

export default cloudinary;
