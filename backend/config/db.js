import mongoose from 'mongoose';

/**
 * Global cached connection for Serverless environments (Vercel/AWS Lambda)
 * Prevents opening multiple connection pools on warm function invocations.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri || uri === 'your_mongodb_connection_string_here') {
    console.warn('[MongoDB] MONGO_URI is not set in Environment Variables.');
    return false;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log(`[MongoDB] Connected: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`);
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.warn(`[MongoDB] Connection error: ${err.message}`);
      return false;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    return false;
  }
};

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};
