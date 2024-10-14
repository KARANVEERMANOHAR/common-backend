import { Request, Response, NextFunction } from 'express';
import { errorI } from '../Interface/commonInterface';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

//#region String Validation
export const isString = (value: any, variableName: string, errors: errorI[], isEmpty: boolean) => {
    let responseArray: errorI[] = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    if (value !== undefined) {
        // Type Check
        if (typeof value != 'string') {
            let errorObject: errorI = { msg: `${variableName} Must Be A String` };
            responseArray.push(errorObject);
        }

        // Empty Check
        if (isEmpty === false) {
            if (value.length === 0) {
                let errorObject: errorI = { msg: `${variableName} Must Not Be Empty` };
                responseArray.push(errorObject);
            }
        }
    } else {
        let errorObject: errorI = {
            msg: `Please Provide Valid Value For ${variableName}`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Exist Validation
export const exists = (errors: errorI[], inputField: any, msg: string): errorI[] => {
    let responseArray: errorI[] = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    if (inputField === undefined) {
        let errorObject: errorI = {
            msg: msg,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Fixed Value Validation
export const fixedValue = (errors: errorI[], valueArray: any[], inputField: any, inputFieldName: string): errorI[] => {
    let responseArray: errorI[] = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    let matched = false;

    for (let x of valueArray) {
        if (x === inputField) {
            matched = true;
        }
    }

    if (matched === false) {
        let errorObject: errorI = {
            msg: `Value Of ${inputFieldName} Must Be One Of [${valueArray}]`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Number Value Validation
export const numberValue = (errors: errorI[], value: any, variableName: string, minValue: number | undefined, maxValue: number | undefined): errorI[] => {
    let responseArray: errorI[] = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    // Check Type Of Given Value
    if (typeof value != 'number') {
        let errorObject: errorI = { msg: `${variableName} Is Not A Number` };
        responseArray.push(errorObject);
        return responseArray;
    }

    // Minimum Value Check
    if (minValue !== undefined) {
        if (value < minValue) {
            let errorObject: errorI = {
                msg: `Minimum Value Of ${variableName} Must Be ${minValue}`,
            };
            responseArray.push(errorObject);
        }
    }

    if (maxValue !== undefined) {
        if (value > maxValue) {
            let errorObject: errorI = {
                msg: `Maximum Value Of ${variableName} Must Be ${maxValue}`,
            };
            responseArray.push(errorObject);
        }
    }

    return responseArray;
};
//#endregion

//#region Check Valid Mongoose Id
export const isValidMongooseId = (errors: errorI[], inputField: any, inputFieldName: string): errorI[] => {
    let responseArray: errorI[] = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    // Check Valid Mongoose Id
    var isValid = mongoose.isValidObjectId(inputField);

    if (isValid === false) {
        let errorObject: errorI = {
            msg: `${inputFieldName} Must Be A Valid Object Id`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion
