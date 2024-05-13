import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { NextFunction, Response } from "express";

/**
 *
 * @param res response
 * @param next next middleware
 * @param userId userId from request
 * @param tokenUserId userId from JWT
 * @returns Error JSON payload
 */
export const verifyOwner = (
  res: Response | any,
  next: NextFunction | any,
  userId: string | undefined,
  tokenUserId: string | undefined
) => {
  if (userId !== tokenUserId)
    return res.status(403).json({
      error: ERROR_MESSAGES.NOT_AUTHORIZED,
      success: false,
      statusCode: HTTP_STATUS_CODE[403].code,
    });

  next();
};
