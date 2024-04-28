import { EnvKeys } from "../common/EnvKeys";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  const secret = EnvKeys.JWT_SECRET;

  jwt.verify(token, secret, async (err: any, payload: any) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;

    next();
  });
};
