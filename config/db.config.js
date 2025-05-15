import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export { connectDb };
