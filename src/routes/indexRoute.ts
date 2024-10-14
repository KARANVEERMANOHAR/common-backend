// Package Imports
import { Router } from "express";
import { addUser } from "../controller/indexController.js";
import { imageUploadMiddleware } from "../middleware/multerMiddleware.js";

const router = Router();

// Controller Imports

router.post("/user", [imageUploadMiddleware], addUser);

export default router;
