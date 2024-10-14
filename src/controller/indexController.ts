// Package Imports
import { NextFunction, Request, Response } from "express";
import { addUserService } from "../services/indexService.js";

// Service Imports

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gender, type } = req.body;
    const { image }: any = req.files;

    const result = await addUserService(gender, type, image);
    // Send Response
    res.status(201).json({ result: result });
  } catch (err: any) {
    next(err);
  }
};
