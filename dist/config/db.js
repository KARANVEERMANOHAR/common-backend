var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { config } from "../config/index.js";
const db = config.MONGO_URI;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect To MongoDB
        yield mongoose.connect(db);
        console.log("Database Connected");
    }
    catch (err) {
        console.log(err.message);
        // Exit Program With Failure
        process.exit(1);
    }
});
export default connectDB;
