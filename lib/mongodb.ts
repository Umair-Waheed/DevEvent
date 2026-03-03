import mongoose, { type Connection } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

// Cache the connection promise on the global object to prevent
// creating multiple connections during Next.js hot reloads in development.
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Returns a cached Mongoose connection, or creates a new one if none exists.
 * Safe to call repeatedly — only one connection is established per process.
 */
const connectToDatabase = async (): Promise<Connection> => {
  // Return the existing connection if already established
  if (cached.conn) return cached.conn;

  // Create a new connection promise if one isn't already pending
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL!, { dbName: "devEvent" })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectToDatabase;
