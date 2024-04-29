"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const EnvKeys_1 = require("../common/EnvKeys");
const utils_1 = require("../utils");
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    if (EnvKeys_1.EnvKeys.isLocal())
        console.log(`${err}\n${(0, utils_1.logError)("NAME", err.name)}\n${(0, utils_1.logError)("STATUS", err.success)}\n${(0, utils_1.logError)("MESSAGE", err.error)}\n${(0, utils_1.logError)("STATUS_CODE", err.statusCode)}`);
    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found`;
        error = new errorResponse_1.ErrorResponse(message, 404);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorResponse_1.ErrorResponse(JSON.stringify(message), 400);
    }
    // PrismaClientInitializationError
    if (err.name === "PrismaClientInitializationError") {
        const message = "Prisma connection failed";
        error = new errorResponse_1.ErrorResponse(message, 500);
    }
    // PrismaClientKnownRequestError
    if (err.name === "PrismaClientKnownRequestError") {
        const message = "Record already exist";
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        statusCode: error.statusCode,
        success: false,
        error: error.message || "Server Error",
    });
};
exports.errorHandler = errorHandler;
