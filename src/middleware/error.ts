import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import { EnvKeys } from "../common/EnvKeys";
import { logError } from "../utils";

export const errorHandler = (
  err: any,
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err);

  if (EnvKeys.isLocal())
    console.log(
      `${err}\n${logError("NAME", err.name)}\n${logError(
        "STATUS",
        err.success
      )}\n${logError("MESSAGE", err.error)}\n${logError(
        "STATUS_CODE",
        err.statusCode
      )}`
    );

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(JSON.stringify(message), 400);
  }

  res.status(error.statusCode || 500).json({
    statusCode: error.statusCode,
    success: false,
    error: error.message || "Server Error",
  });
};
