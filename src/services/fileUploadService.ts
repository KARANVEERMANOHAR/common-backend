// Package Imports
import { config } from "../../config/index.js";
import AWS from "aws-sdk";

// Image Upload
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

// Error Handler
import APIError from "../exception/errorHandler.js";

// Interface Imports
import { AWSUploadedObjectResponseI } from "../Interface/AWSInterface.js";

// AWS Configurations

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

//#region File Upload Service
export const fileUploadService = async (
  filePath: any,
  nameOfFile: string,
  downloadable: boolean
): Promise<AWSUploadedObjectResponseI> => {
  try {
    // Defining Variables
    const s3 = new AWS.S3();
    const path: any = filePath;
    const buffer = fs.readFileSync(path);
    const type: any = await fileTypeFromBuffer(buffer);
    const fileName: any = nameOfFile;

    // Define Params
    const params: any = {
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
    let result: any = await s3.upload(params).promise();
    // Resolve Promise
    return result;
  } catch (err: any) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};

//#endregion

//#region File Upload Service
export const uploadBase64ToS3 = async (
  base64String: string,
  nameOfFile: string,
  downloadable: boolean
): Promise<string> => {
  try {
    // Initialize S3
    const s3 = new AWS.S3();

    // Convert Base64 String to Buffer
    const buffer = Buffer.from(base64String, "base64");

    // Detect the file type from the buffer
    const type: any = await fileTypeFromBuffer(buffer);

    // Define S3 upload parameters
    const params: any = {
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
    const result: any = await s3.upload(params).promise();

    // Return the file's URL
    return result.Location;
  } catch (err: any) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};
//#endregion
