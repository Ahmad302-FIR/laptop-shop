import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * Global cached connection for Serverless environments (Vercel/AWS Lambda)
 * Prevents opening multiple connection pools on warm function invocations.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri || uri.includes('your_mongodb_connection_string') || uri.trim() === '') {
    console.warn('[MongoDB] WARNING: MONGODB_URI / MONGO_URI is not set or contains placeholder in environment variables.');
    return false;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log(`[MongoDB] Connected successfully to host: ${mongooseInstance.connection.host}, database: ${mongooseInstance.connection.name}`);
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error(`[MongoDB] Connection error: ${err.message}`);
        return false;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error(`[MongoDB] Await connection failed: ${e.message}`);
    return false;
  }
};

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

export default connectDB;
