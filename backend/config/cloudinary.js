import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Configure Cloudinary with environment variables
 */
const configureCloudinary = () => {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || '';
  const api_key = process.env.CLOUDINARY_API_KEY || '';
  const api_secret = process.env.CLOUDINARY_API_SECRET || '';

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true
  });

  return { cloud_name, api_key, api_secret };
};

// Initial config
configureCloudinary();

/**
 * Check if valid Cloudinary credentials are configured in environment variables
 */
export const isCloudinaryConfigured = () => {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  return Boolean(
    name &&
    key &&
    secret &&
    name.trim() !== '' &&
    key.trim() !== '' &&
    secret.trim() !== '' &&
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
    console.warn('[Cloudinary] Error extracting public_id:', err.message);
    return null;
  }
};

/**
 * Delete an image from Cloudinary by URL or public ID
 */
export const deleteCloudinaryImage = async (urlOrPublicId) => {
  if (!urlOrPublicId) return;

  if (!isCloudinaryConfigured()) {
    console.warn('[Cloudinary] Cannot delete image: credentials not configured in environment variables.');
    return;
  }

  try {
    configureCloudinary();
    const publicId = urlOrPublicId.includes('cloudinary.com')
      ? extractPublicId(urlOrPublicId)
      : urlOrPublicId;

    if (!publicId) return;

    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`[Cloudinary] Deleted image: ${publicId} (result: ${result?.result})`);
    return result;
  } catch (error) {
    console.warn(`[Cloudinary Warning] Failed to delete image (${urlOrPublicId}):`, error.message);
  }
};

/**
 * Upload an in-memory buffer to Cloudinary using upload_stream
 * @param {Buffer} buffer - File buffer
 * @param {Object} options - Cloudinary upload options (folder, resource_type, etc.)
 * @returns {Promise<Object>} Cloudinary upload response containing secure_url
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(
        new Error(
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your backend environment variables.'
        )
      );
    }

    configureCloudinary();

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
          console.error('[Cloudinary Stream Error]:', error);
          return reject(error);
        }
        console.log(`[Cloudinary] Uploaded image successfully: ${result.secure_url} (public_id: ${result.public_id})`);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

export default cloudinary;
