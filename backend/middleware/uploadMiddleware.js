import multer from 'multer';
import { isCloudinaryConfigured, uploadBufferToCloudinary } from '../config/cloudinary.js';

// Use in-memory storage so buffers can be streamed directly to Cloudinary
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
 * Process uploaded image buffers and upload directly to Cloudinary
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
          existingImages = [req.body.existingImages];
        }
      } else if (Array.isArray(req.body.existingImages)) {
        existingImages = req.body.existingImages;
      }
    }

    // Process new image files if uploaded
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      if (!isCloudinaryConfigured()) {
        console.error('[Upload Error] Attempted image upload without Cloudinary credentials configured.');
        return res.status(400).json({
          success: false,
          message:
            'Cloudinary credentials are not configured on the server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend environment variables.'
        });
      }

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        try {
          const uploadResult = await uploadBufferToCloudinary(file.buffer, {
            folder: 'laptop-shop-products'
          });

          if (uploadResult && uploadResult.secure_url) {
            newImageUrls.push(uploadResult.secure_url);
          } else {
            throw new Error('Cloudinary response did not contain secure_url');
          }
        } catch (cloudErr) {
          console.error(`[Cloudinary Upload Failed for file ${file.originalname}]:`, cloudErr.message);
          return res.status(500).json({
            success: false,
            message: `Failed to upload image "${file.originalname}" to Cloudinary: ${cloudErr.message}`
          });
        }
      }
    }

    // Combine existing images with newly uploaded Cloudinary image URLs
    const combinedImages = [...existingImages, ...newImageUrls];

    if (combinedImages.length > 0) {
      req.body.images = combinedImages;
    } else if (req.body.images && typeof req.body.images === 'string') {
      try {
        req.body.images = JSON.parse(req.body.images);
      } catch (e) {
        req.body.images = [req.body.images];
      }
    }

    // Parse keyFeatures if sent as JSON string in FormData
    if (req.body.keyFeatures && typeof req.body.keyFeatures === 'string') {
      try {
        req.body.keyFeatures = JSON.parse(req.body.keyFeatures);
      } catch (e) {
        req.body.keyFeatures = req.body.keyFeatures.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }

    // Parse and cast numeric and boolean fields from FormData
    if (req.body.price !== undefined && req.body.price !== '') {
      req.body.price = Number(req.body.price);
    }
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
