import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  if (isConnected) return; // إذا كان الاتصال قائمًا مسبقًا، لا حاجة لإعادة الاتصال

  // تحقق من وجود متغير البيئة MONGO_URI
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in the environment variables.");
    throw new Error("MONGO_URI is not defined");
  }

  try {
    // الاتصال بقاعدة البيانات
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "learning",
    });
    
    // إذا تم الاتصال بنجاح
    isConnected = true;
    console.log("✅ Mongo connected successfully.");
  } catch (err) {
    // إذا فشل الاتصال
    console.error("❌ Mongo connection error:", err);
    throw err; // رمي الخطأ مجددًا لكي يتم التعامل معه في مكان آخر إذا لزم الأمر
  }
};

export default connect;

