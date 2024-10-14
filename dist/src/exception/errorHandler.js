var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED_REQUEST"] = 401] = "UNAUTHORIZED_REQUEST";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["BAD_INPUT"] = 422] = "BAD_INPUT";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(HttpStatusCode || (HttpStatusCode = {}));
class BaseError extends Error {
    constructor(name, httpCode, isOperational, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
export default class APIError extends BaseError {
    constructor(name = "INTERNAL_ERROR", httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = false, description = "Internal server error") {
        super(name, httpCode, isOperational, description);
    }
}
export const returnError = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let error;
    // console.log(err.response.status);
    if ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status)
        error = err.response.data.errors[0];
    else
        error = err;
    console.log(`[${new Date().toLocaleString()}][ERR][${req.ip}]`, error.message, error.stack);
    if (error.isOperational)
        res.status(error.httpCode || 500).json({
            errors: [
                {
                    message: error.message,
                    isOperational: error.isOperational,
                    httpCode: error.httpCode || 500,
                },
            ],
        });
    else
        res.status(error.httpCode || 500).json({
            errors: [
                {
                    message: "Internal server error.",
                    isOperational: false,
                    httpCode: error.httpCode || 500,
                },
            ],
        });
});
