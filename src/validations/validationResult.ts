import { Request, Response, NextFunction } from 'express';
import { errorI } from '../Interface/commonInterface';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

//#region Result Checker
export const resultChecker = (req: Request, res: Response) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.errors;
    }
    return [];
};
//#endregion
