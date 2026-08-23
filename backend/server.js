import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB, getDBDiagnostic } from './config/db.js';
import { seedDatabase } from './utils/seedData.js';
import { isCloudinaryConfigured } from './config/cloudinary.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Setup dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (local development)
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads folder exists (for local file storage)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (err) {
    // Ignore in read-only serverless filesystems
  }
}

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving (local)
app.use('/uploads', express.static(uploadsDir));

// Database connection middleware for Serverless & Long-running instances
let seeded = false;
app.use(async (req, res, next) => {
  try {
    const isConnected = await connectDB();
    if (isConnected && !seeded) {
      seeded = true;
      seedDatabase().catch((err) => console.warn('Auto-seed error:', err.message));
    }
  } catch (err) {
    console.warn('DB connection middleware warning:', err.message);
  }
  next();
});

// Root welcome / health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Yasin Wahab Laptop Store API',
    database: getDBDiagnostic(),
    cloudinaryConfigured: isCloudinaryConfigured(),
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      adminLogin: '/api/admin/login'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Yasin Wahab Laptop Store API',
    database: getDBDiagnostic(),
    cloudinaryConfigured: isCloudinaryConfigured(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/admin', authRoutes);
app.use('/api/products', productRoutes);

// 404 Catch-all for API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start listening only in standalone local mode (NOT on Vercel Serverless)
if (!process.env.VERCEL) {
  connectDB().then((isConnected) => {
    if (isConnected) {
      seedDatabase().catch(console.error);
    }
  });

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Yasin Wahab Laptop Store Backend running on port ${PORT}`);
    console.log(`📍 REST API: http://localhost:${PORT}/api/products`);
    console.log(`🛡️ Admin API: http://localhost:${PORT}/api/admin/login`);
    console.log(`====================================================`);
  });
}

export default app;
