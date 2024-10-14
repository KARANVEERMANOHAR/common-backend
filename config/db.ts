import mongoose from "mongoose";
import { config } from "../config/index.js";
const db: string = config.MONGO_URI;

const connectDB = async () => {
  try {
    // Connect To MongoDB
    await mongoose.connect(db);
    console.log("Database Connected");
  } catch (err: any) {
    console.log(err.message);
    // Exit Program With Failure
    process.exit(1);
  }
};

export default connectDB;
