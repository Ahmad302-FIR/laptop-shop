import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Disable Mongoose query buffering so queries fail fast instead of hanging when disconnected
mongoose.set('bufferCommands', false);

/**
 * Global cached connection for Serverless environments (Vercel/AWS Lambda)
 * Prevents opening multiple connection pools on warm function invocations.
 */
let cached = global.mongoose;
let lastConnectionError = null;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri || uri.includes('your_mongodb_connection_string') || uri.trim() === '') {
    lastConnectionError =
      'MONGODB_URI is not set in Vercel Environment Variables (or is set to a placeholder).';
    console.warn(`[MongoDB] ${lastConnectionError}`);
    return false;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        lastConnectionError = null;
        console.log(
          `[MongoDB] Connected successfully to host: ${mongooseInstance.connection.host}, database: ${mongooseInstance.connection.name}`
        );
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        lastConnectionError = err.message;
        console.error(`[MongoDB] Connection error: ${err.message}`);
        return false;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    lastConnectionError = e.message;
    console.error(`[MongoDB] Connection attempt failed: ${e.message}`);
    return false;
  }
};

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const getDBDiagnostic = () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  const isConfigured = Boolean(
    uri && !uri.includes('your_mongodb_connection_string') && uri.trim() !== ''
  );
  let sanitizedHost = 'Not Set';
  if (isConfigured) {
    try {
      const parts = uri.split('@');
      sanitizedHost = parts.length > 1 ? parts[1].split('/')[0] : 'Direct URI (Hidden)';
    } catch (e) {
      sanitizedHost = 'Configured';
    }
  }

  return {
    isConfigured,
    sanitizedHost,
    isConnected: mongoose.connection.readyState === 1,
    connectionState:
      ['disconnected', 'connected', 'connecting', 'disconnecting'][
        mongoose.connection.readyState
      ] || 'unknown',
    lastError: lastConnectionError
  };
};

export default connectDB;
