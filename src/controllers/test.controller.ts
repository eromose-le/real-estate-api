import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { asyncHandler } from "../middleware/async";
import { EnvKeys } from "../common/EnvKeys";
import { ERROR_MESSAGES } from "../constants";

interface CustomRequest extends Request {
  userId?: string;
}

interface Payload {
  isAdmin: boolean;
}

export const shouldBeLoggedIn = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.userId);
    res.status(200).json({ message: "You are Authenticated" });
  }
);

export const shouldBeAdmin = asyncHandler(async (req, res) => {
  const token: string = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: ERROR_MESSAGES.NOT_AUTHENTICATED });
  const secret: string = EnvKeys.JWT_SECRET;

  jwt.verify(
    token,
    secret,
    async (err: VerifyErrors | null, payload: Payload | any): Promise<any> => {
      if (err) {
        return res.status(403).json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
      }

      if (!payload?.isAdmin) {
        return res.status(403).json({ message: ERROR_MESSAGES.NOT_AUTHORIZED });
      }
    }
  );

  res.status(200).json({ message: "Hey Admin!, you are Authenticated" });
});
