import mongoose from "mongoose";

let isConnected = false; // 🔒 لتتبع حالة الاتصال الحالية

export default async function connect() {
  if (isConnected && mongoose.connection.readyState === 1) {
    // ✅ إذا كان متصلاً مسبقًا بشكل صحيح، لا نحاول الاتصال مجددًا
    return;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is not defined in environment variables.");
    throw new Error("MONGO_URI is missing");
  }

  try {
    console.log("⚙️ Attempting to connect to MongoDB...");

    await mongoose.connect(uri, {
      dbName: "learning",
      // يمكنك إضافة خيارات إضافية لو أردت مثل:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
