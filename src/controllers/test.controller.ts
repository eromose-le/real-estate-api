import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { asyncHandler } from "../middleware/async";
import { EnvKeys } from "../common/EnvKeys";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";

interface CustomRequest extends Request {
  userId?: string;
}

interface Payload {
  isAdmin: boolean;
}

export const shouldBeLoggedIn = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.userId);
    res.status(200).json({
      message: "You are Authenticated",
      data: null,
      success: true,
    });
  }
);

export const shouldBeAdmin = asyncHandler(async (req, res) => {
  const token: string = req.cookies.token;

  if (!token)
    return res.status(401).json({
      error: ERROR_MESSAGES.NOT_AUTHENTICATED,
      success: false,
      statusCode: HTTP_STATUS_CODE[401],
    });
  const secret: string = EnvKeys.JWT_SECRET;

  jwt.verify(
    token,
    secret,
    async (err: VerifyErrors | null, payload: Payload | any): Promise<any> => {
      if (err) {
        return res.status(403).json({
          error: ERROR_MESSAGES.TOKEN_EXPIRED,
          success: false,
          statusCode: HTTP_STATUS_CODE[403],
        });
      }

      if (!payload?.isAdmin) {
        return res.status(403).json({
          error: ERROR_MESSAGES.NOT_AUTHORIZED,
          success: false,
          statusCode: HTTP_STATUS_CODE[403],
        });
      }
    }
  );

  res.status(200).json({
    message: "Hey Admin!, you are Authenticated",
    data: null,
    success: true,
  });
});
