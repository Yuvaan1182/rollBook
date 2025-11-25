import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export default function validate(
  schema: z.ZodType,
  property: "body" | "query" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[property]);
      req[property] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Validation Error",
          details: err.issues,
        });
      }
      next(err);
    }
  };
}
