import { ERROR_MESSAGES } from "../constants";
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

  if (!token) return res.status(401).json({ message: ERROR_MESSAGES.NOT_AUTHENTICATED });

  const secret = EnvKeys.JWT_SECRET;

  jwt.verify(token, secret, async (err: any, payload: Payload | any) => {
    if (err)
      return res.status(403).json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
    console.log("[PAYLOAD]", payload);
    req.userId = payload.id;

    next();
  });
};
