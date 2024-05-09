import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

type AsyncHandlerFunction = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (fn: AsyncHandlerFunction): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
