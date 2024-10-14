// Error Handler Imports
import APIError, { HttpStatusCode } from "../exception/errorHandler.js";

// Service Imports
import { fileUploadService } from "./fileUploadService.js";

// Interface Imports
import { fileI } from "../Interface/fileInterface.js";

// Model Imports
import User from "../models/userModel.js";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = resolve(__dirname, "../../../uploads");

export const addUserService = async (
  gender: string,
  type: string,
  image: fileI[]
) => {
  try {
    console.log(uploadDir);

    if (!image || !image[0].path || !image.length) {
      throw new APIError(
        "Image Not Found",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Image Not Found"
      );
    }

    const orignalImageS3Link = await fileUploadService(
      image[0].path,
      image[0].filename,
      true
    );

    const user = new User({
      gender,
      type,
      orignalImage: orignalImageS3Link.Location,
    });

    await user.save();

    return Promise.resolve(orignalImageS3Link.Location);
  } catch (err: any) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};
