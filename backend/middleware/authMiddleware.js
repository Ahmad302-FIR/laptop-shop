import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { isDBConnected } from '../config/db.js';

export const verifyAdminToken = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization Header: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-access-token']) {
      token = req.headers['x-access-token'];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authorization token provided. Please log in as admin.'
      });
    }

    const secret = process.env.JWT_SECRET || 'yasin_wahab_super_secret_jwt_key_2026_production';
    const decoded = jwt.verify(token, secret);

    if (isDBConnected()) {
      const adminUser = await Admin.findById(decoded.id).select('-password');
      if (!adminUser) {
        return res.status(401).json({
          success: false,
          message: 'Admin account associated with this token no longer exists.'
        });
      }
      req.admin = adminUser;
    } else {
      // In-memory / dev fallback if DB is not actively connected
      req.admin = { id: decoded.id, username: decoded.username, role: 'admin' };
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token.'
    });
  }
};
