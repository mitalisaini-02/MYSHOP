import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDB = async () => {
  // Setup listeners BEFORE connection
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    console.log("✅ MongoDB connection string:", `${process.env.MONGODB_URI}/e-commerce`);
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
};

export default connectDB;
