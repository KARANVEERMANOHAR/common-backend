var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Error Handler Imports
import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
// Service Imports
import { fileUploadService } from "./fileUploadService.js";
// Model Imports
import User from "../models/userModel.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = resolve(__dirname, "../../../uploads");
export const addUserService = (gender, type, image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(uploadDir);
        if (!image || !image[0].path || !image.length) {
            throw new APIError("Image Not Found", HttpStatusCode.BAD_REQUEST, true, "Image Not Found");
        }
        const orignalImageS3Link = yield fileUploadService(image[0].path, image[0].filename, true);
        const user = new User({
            gender,
            type,
            orignalImage: orignalImageS3Link.Location,
        });
        yield user.save();
        return Promise.resolve(orignalImageS3Link.Location);
    }
    catch (err) {
        throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
    }
});
