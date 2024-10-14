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
import fs from "fs";
import APIError from "../exception/errorHandler.js";
//#region Delete File From Path Service
export const deleteFileFromPathService = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete File
        fs.unlink(path, () => { });
        // Resolve Promise
        return Promise.resolve();
    }
    catch (err) {
        throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
    }
});
//#endregion
