import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { connectDB, isDBConnected } from '../config/db.js';

// Generates signed JWT token
const generateToken = (id, username) => {
  const secret = process.env.JWT_SECRET || 'yasin_wahab_super_secret_jwt_key_2026_production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id, username, role: 'admin' }, secret, { expiresIn });
};

/**
 * Admin Login Controller
 * POST /api/admin/login
 */
export const loginAdmin = async (req, res) => {
  try {
    if (!isDBConnected()) {
      await connectDB();
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    // Find admin in MongoDB
    let admin = await Admin.findOne({ username: cleanUsername });

    // If database is initialized but default admin doesn't exist yet, auto-create
    if (!admin) {
      const defaultUsername = (
        process.env.ADMIN_USERNAME && process.env.ADMIN_USERNAME !== 'your_admin_username_here'
          ? process.env.ADMIN_USERNAME
          : process.env.ADMIN_DEFAULT_USERNAME || 'admin'
      ).toLowerCase();

      const defaultPassword =
        process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD !== 'your_admin_password_here'
          ? process.env.ADMIN_PASSWORD
          : process.env.ADMIN_DEFAULT_PASSWORD || 'admin12345';

      if (cleanUsername === defaultUsername && password === defaultPassword) {
        admin = await Admin.create({
          username: defaultUsername,
          password: defaultPassword,
          role: 'admin'
        });
        console.log(`[Auth] Auto-created default admin user: ${defaultUsername}`);
      }
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const token = generateToken(admin._id, admin.username);

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};

/**
 * Get Current Logged-in Admin Profile
 * GET /api/admin/me
 */
export const getAdminProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching admin profile',
      error: error.message
    });
  }
};
