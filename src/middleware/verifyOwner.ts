import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { NextFunction, Request, Response } from "express";

export const verifyOwner = (
  res: Response | any,
  next: NextFunction | any,
  userId: string,
  tokenUserId: string | undefined
) => {
  if (userId !== tokenUserId)
    return res.status(403).json({
      error: ERROR_MESSAGES.NOT_AUTHORIZED,
      success: false,
      statusCode: HTTP_STATUS_CODE[403],
    });

  next();
};
