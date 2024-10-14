var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Package Imports
import { config } from "../../config/index.js";
import AWS from "aws-sdk";
// Image Upload
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
// Error Handler
import APIError from "../exception/errorHandler.js";
// AWS Configurations
AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION,
});
//#region File Upload Service
export const fileUploadService = (filePath, nameOfFile, downloadable) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Defining Variables
        const s3 = new AWS.S3();
        const path = filePath;
        const buffer = fs.readFileSync(path);
        const type = yield fileTypeFromBuffer(buffer);
        const fileName = nameOfFile;
        // Define Params
        const params = {
            Body: buffer,
            Bucket: config.AWS_BUCKET_NAME,
            ContentType: type.mime,
            Key: `${config.AWS_BUCKET_FOLDER}/${fileName}.${type.ext}`,
            // Uploading Downloadable Files
        };
        if (downloadable === true) {
            params.ContentDisposition = "attachment";
        }
        // Get Result
        let result = yield s3.upload(params).promise();
        // Resolve Promise
        return result;
    }
    catch (err) {
        throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
    }
});
//#endregion
//#region File Upload Service
export const uploadBase64ToS3 = (base64String, nameOfFile, downloadable) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize S3
        const s3 = new AWS.S3();
        // Convert Base64 String to Buffer
        const buffer = Buffer.from(base64String, "base64");
        // Detect the file type from the buffer
        const type = yield fileTypeFromBuffer(buffer);
        // Define S3 upload parameters
        const params = {
            Body: buffer,
            Bucket: config.AWS_BUCKET_NAME,
            ContentType: type.mime,
            Key: `${config.AWS_BUCKET_FOLDER}/${nameOfFile}.${type.ext}`,
        };
        // Set ContentDisposition to "attachment" if downloadable
        if (downloadable) {
            params.ContentDisposition = "attachment";
        }
        // Upload to S3
        const result = yield s3.upload(params).promise();
        // Return the file's URL
        return result.Location;
    }
    catch (err) {
        throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
    }
});
//#endregion
