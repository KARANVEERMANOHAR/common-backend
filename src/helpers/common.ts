// Package Imports
import fs from "fs";
import APIError, { HttpStatusCode } from "../exception/errorHandler.js";

//#region Delete File From Path Service
export const deleteFileFromPathService = async (path: string) => {
  try {
    // Delete File
    fs.unlink(path, () => {});

    // Resolve Promise
    return Promise.resolve();
  } catch (err: any) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};
//#endregion
