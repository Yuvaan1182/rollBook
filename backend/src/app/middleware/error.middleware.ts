import { Request, Response, NextFunction } from "express";
import logger from "../../core/logger/logger";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If headers already sent → let Express handle
  if (res.headersSent) {
    return next(err);
  }

  // Safe copy of body (remove sensitive stuff)
  const safeBody = { ...req.body };
  const sensitiveKeys = ["password", "otp", "token"];
  for (const key of sensitiveKeys) delete safeBody[key];

  // Log using Pino
  logger.error(
    {
      name: err.name,
      message: err.message,
      stack: err.stack,
      requestId: (req as any).id,
      url: req.originalUrl,
      method: req.method,
      body: safeBody,
      params: req.params,
      query: req.query,
    },
    "Unhandled application error"
  );

  const status = err.statusCode || err.status || 500;
  const message =
    err.isOperational && err.message ? err.message : "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
