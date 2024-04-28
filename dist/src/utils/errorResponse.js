"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const EnvKeys_1 = require("../common/EnvKeys");
class ErrorResponse extends Error {
    constructor(message, statusCode, error = message, success = false) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.success = success;
        // this.name = "ErrorResponse"; // Optional
        if (EnvKeys_1.EnvKeys.isLocal()) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ErrorResponse = ErrorResponse;
