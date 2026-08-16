import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/DrVisit`, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
