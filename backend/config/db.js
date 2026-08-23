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

// Find any valid MongoDB URI variable name from environment
export const getMongoUri = () => {
  const possibleKeys = [
    'MONGODB_URI',
    'MONGO_URI',
    'MONGODB_URL',
    'MONGO_URL',
    'DATABASE_URL',
    'DB_URI'
  ];

  for (const key of possibleKeys) {
    const val = process.env[key];
    if (val && !val.includes('your_mongodb_connection_string') && val.trim() !== '') {
      return { uri: val.trim(), keyName: key };
    }
  }
  return { uri: null, keyName: null };
};

export const connectDB = async () => {
  const { uri, keyName } = getMongoUri();

  if (!uri) {
    lastConnectionError =
      'No MongoDB URI found in environment variables. Set MONGODB_URI or MONGO_URI in your Vercel Backend Project settings.';
    console.warn(`[MongoDB] ${lastConnectionError}`);
    return false;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 6000
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        lastConnectionError = null;
        console.log(
          `[MongoDB] Connected successfully (using ${keyName}) to host: ${mongooseInstance.connection.host}, database: ${mongooseInstance.connection.name}`
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
  const { uri, keyName } = getMongoUri();
  const isConfigured = Boolean(uri);
  let sanitizedHost = 'Not Set';

  if (isConfigured) {
    try {
      const parts = uri.split('@');
      sanitizedHost = parts.length > 1 ? parts[1].split('/')[0] : 'Direct URI';
    } catch (e) {
      sanitizedHost = 'Configured';
    }
  }

  // Scan for any DB keys present in env
  const detectedKeys = [
    'MONGODB_URI',
    'MONGO_URI',
    'MONGODB_URL',
    'MONGO_URL',
    'DATABASE_URL',
    'DB_URI'
  ].filter((k) => Boolean(process.env[k]));

  return {
    isConfigured,
    detectedKeys,
    activeKeyUsed: keyName || 'none',
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
