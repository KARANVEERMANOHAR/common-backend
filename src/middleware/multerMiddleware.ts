// Package Imports
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

//#region Upload Image Middleware

// Disk Storage Properties
const storage = multer.diskStorage({
  // Changing Destination
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },

  filename: (req: any, file: any, cb: any) => {
    // Generate UUID
    const uniqueId = uuidv4();

    // Original File Name
    const { originalname } = file;

    // Assigning New Name To File
    cb(null, `${uniqueId}${originalname}`);
  },
});

// Upload Middleware
const uploadFileMiddleware = multer({ storage });

//#endregion

//#region Profile Image Upload File

export const imageUploadMiddleware = uploadFileMiddleware.fields([
  { name: "image", maxCount: 1 },
]);

//#endregion
