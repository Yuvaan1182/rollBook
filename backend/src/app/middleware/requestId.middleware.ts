import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export function requestId(req: Request, _res: Response, next: NextFunction) {
  (req as any).id = uuid();
  next();
}
