import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shlokvani';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isConnected: false };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Quick timeout for graceful fallback
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.isConnected = true;
        console.log('🕉️ Connected to MongoDB: shlokvani');
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn('⚠️ MongoDB connection could not be established. Operating in graceful fallback mode using bundled datasets:', err.message);
        cached.promise = null;
        cached.isConnected = false;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.isConnected = false;
    return null;
  }

  return cached.conn;
}

export function isDbConnected() {
  return cached && cached.isConnected;
}

export default connectToDatabase;

