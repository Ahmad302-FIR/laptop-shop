import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { isCloudinaryConfigured, uploadBufferToCloudinary } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localUploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure local uploads directory exists for offline fallback
if (!fs.existsSync(localUploadsDir)) {
  try {
    fs.mkdirSync(localUploadsDir, { recursive: true });
  } catch (err) {
    // Ignore in read-only environments
  }
}

// Memory storage to hold file buffers for Cloudinary stream upload
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/svg+xml'
  ];

  if (allowedMimes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only image files are allowed.`), false);
  }
};

// Multer upload instance for up to 6 images per product
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 6 // 6 files max
  }
});

/**
 * Middleware to parse multipart/form-data images field
 */
export const uploadProductImages = (req, res, next) => {
  const multerMiddleware = upload.array('images', 6);

  multerMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'One or more image files exceed the 10MB size limit.'
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'You can upload a maximum of 6 images per product.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed'
      });
    }
    next();
  });
};

/**
 * Process uploaded image buffers and upload to Cloudinary (or local fallback)
 */
export const processCloudinaryUploads = async (req, res, next) => {
  try {
    const newImageUrls = [];

    // Parse existingImages from request body if present (common in PUT / edit mode)
    let existingImages = [];
    if (req.body.existingImages) {
      if (typeof req.body.existingImages === 'string') {
        try {
          existingImages = JSON.parse(req.body.existingImages);
        } catch (e) {
          // If it's a single raw URL string
          existingImages = [req.body.existingImages];
        }
      } else if (Array.isArray(req.body.existingImages)) {
        existingImages = req.body.existingImages;
      }
    }

    // Process new files if uploaded
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const cloudinaryAvailable = isCloudinaryConfigured();

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];

        if (cloudinaryAvailable) {
          try {
            const uploadResult = await uploadBufferToCloudinary(file.buffer, {
              folder: 'laptop-shop-products'
            });
            if (uploadResult && uploadResult.secure_url) {
              newImageUrls.push(uploadResult.secure_url);
            }
          } catch (cloudErr) {
            console.error('Cloudinary upload error:', cloudErr.message);
            // Fallback to local file if Cloudinary API fails
            const localUrl = saveFileLocally(file, req);
            newImageUrls.push(localUrl);
          }
        } else {
          // Local storage fallback for development without Cloudinary credentials
          const localUrl = saveFileLocally(file, req);
          newImageUrls.push(localUrl);
        }
      }
    }

    // Combine existing images with newly uploaded images
    const combinedImages = [...existingImages, ...newImageUrls];

    // If new images or existingImages were provided, update req.body.images
    if (combinedImages.length > 0) {
      req.body.images = combinedImages;
    } else if (req.body.images && typeof req.body.images === 'string') {
      try {
        req.body.images = JSON.parse(req.body.images);
      } catch (e) {
        req.body.images = [req.body.images];
      }
    }

    // Parse keyFeatures if it was sent as JSON string in FormData
    if (req.body.keyFeatures && typeof req.body.keyFeatures === 'string') {
      try {
        req.body.keyFeatures = JSON.parse(req.body.keyFeatures);
      } catch (e) {
        req.body.keyFeatures = req.body.keyFeatures.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }

    // Convert booleans and numeric fields sent via FormData
    if (req.body.price !== undefined) req.body.price = Number(req.body.price);
    if (req.body.oldPrice !== undefined && req.body.oldPrice !== '') {
      req.body.oldPrice = Number(req.body.oldPrice);
    } else if (req.body.oldPrice === '') {
      req.body.oldPrice = null;
    }
    if (req.body.featured !== undefined) {
      req.body.featured = req.body.featured === true || req.body.featured === 'true' || req.body.featured === '1';
    }
    if (req.body.onSale !== undefined) {
      req.body.onSale = req.body.onSale === true || req.body.onSale === 'true' || req.body.onSale === '1';
    }
    if (req.body.charger !== undefined) {
      req.body.charger = req.body.charger === true || req.body.charger === 'true' || req.body.charger === '1';
    }

    next();
  } catch (error) {
    console.error('Error processing uploads:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing uploaded images',
      error: error.message
    });
  }
};

/**
 * Local file fallback helper
 */
function saveFileLocally(file, req) {
  try {
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(localUploadsDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const protocol = req.protocol || 'http';
    const host = req.get('host') || 'localhost:5000';
    return `${protocol}://${host}/uploads/${filename}`;
  } catch (err) {
    console.warn('Local disk save fallback error:', err.message);
    // Return base64 as ultimate fallback
    return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  }
}
