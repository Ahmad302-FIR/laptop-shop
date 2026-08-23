import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleStockStatus,
  updateProductPrice,
  toggleSaleStatus,
  toggleFeaturedStatus
} from '../controllers/productController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';
import {
  uploadProductImages,
  processCloudinaryUploads
} from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected Admin Routes (Multipart FormData + Cloudinary Uploads)
router.post(
  '/',
  verifyAdminToken,
  uploadProductImages,
  processCloudinaryUploads,
  createProduct
);

router.put(
  '/:id',
  verifyAdminToken,
  uploadProductImages,
  processCloudinaryUploads,
  updateProduct
);

router.delete('/:id', verifyAdminToken, deleteProduct);

// Quick Patch Actions
router.patch('/:id/stock', verifyAdminToken, toggleStockStatus);
router.patch('/:id/price', verifyAdminToken, updateProductPrice);
router.patch('/:id/sale', verifyAdminToken, toggleSaleStatus);
router.patch('/:id/featured', verifyAdminToken, toggleFeaturedStatus);

export default router;
