import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://osamasysy632:pChaQwSz6i0ljucj@cluster0.m8lxc.mongodb.net/learning?retryWrites=true&w=majority"; // 👈 غيّر اسم القاعدة

const cleanDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const result1 = await mongoose.connection.db
      .collection("users")
      .updateMany({}, { $pull: { posts: { userId: { $exists: false } } } });

    const result2 = await mongoose.connection.db
      .collection("users")
      .updateMany({}, { $pull: { posts: { userId: "demoUser" } } });

    console.log("🧹 Cleaning completed:", result1.modifiedCount + result2.modifiedCount, "posts removed");
  } catch (err) {
    console.error("❌ Error cleaning database:", err);
  } finally {
    await mongoose.disconnect();
  }
};

cleanDatabase();
