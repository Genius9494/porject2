import mongoose from "mongoose";
console.log("Loaded URI:", process.env.MONGO_URI);


interface MongooseGlobalCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// استخدام كاش لتجنب إعادة الاتصال في كل مرة أثناء التطوير
let cached: MongooseGlobalCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}


async function connect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env.local");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      dbName: "learning",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ DB connected successfully!");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}console.log("MONGO_URI from env:", process.env.MONGO_URI);




export default connect;
