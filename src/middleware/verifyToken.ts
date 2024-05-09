import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { EnvKeys } from "../common/EnvKeys";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
export const verifyToken = (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      error: ERROR_MESSAGES.NOT_AUTHENTICATED,
      success: false,
      statusCode: HTTP_STATUS_CODE[401],
    });

  const secret = EnvKeys.JWT_SECRET;

  jwt.verify(token, secret, async (err: any, payload: Payload | any) => {
    if (err)
      return res.status(403).json({
        error: ERROR_MESSAGES.TOKEN_EXPIRED,
        success: false,
        statusCode: HTTP_STATUS_CODE[403],
      });
    console.log("[verify]", payload);
    req.userId = payload.id;

    next();
  });
};
