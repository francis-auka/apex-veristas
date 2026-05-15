import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "❌  Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Cached connection object — prevents creating multiple connections
 * during Next.js hot-reloads in development.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global type to include our cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5_000,
      socketTimeoutMS: 45_000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mg) => {
      console.log("✅  MongoDB connected");
      return mg;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.error("❌  MongoDB connection error:", err);
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
