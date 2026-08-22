import express from 'express';
import { loginAdmin, getAdminProfile } from '../controllers/authController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', loginAdmin);

// GET /api/admin/me (Protected)
router.get('/me', verifyAdminToken, getAdminProfile);

export default router;
