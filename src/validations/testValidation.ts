// Package Imports
import { body, check } from 'express-validator';
import { resultChecker } from './validationResult.js';
import { Request, Response, NextFunction } from 'express';

// Interface Imports
import { errorI } from '../Interface/commonInterface.js';

// Error Handler Imports
import APIError, { HttpStatusCode } from '../exception/errorHandler.js';

// Common Validation Imports
import { isString } from './commonValidations.js';

//#region Test Validation

export const testCustomValidation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Destructure Request
		const { testVariable1 } = req.body;

		// Result Checker
		let errors: errorI[] = resultChecker(req, res);

		// Check Custom Validation
		if (errors.length === 0) {
			// Test Variable Empty String Check
			errors = isString(testVariable1, 'Test Variable 1', errors, false);

			// No Error
			if (errors.length === 0) {
				next();
			}

			// Error Found
			else {
				return res.status(HttpStatusCode.BAD_INPUT).json({ errors: errors });
			}
		}

		// Express Validator Errors
		else {
			return res.status(HttpStatusCode.BAD_INPUT).json({ errors: errors });
		}
	} catch (err: any) {
		return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: [{ msg: err.message }] });
	}
};

//#region Student Overall Fields
export const testVariableFields = [check('testVariable1', 'Test Variable 1 Is Required').exists()];
//#endregion

//#endregion
