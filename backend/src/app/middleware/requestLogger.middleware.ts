import { Request, Response, NextFunction } from "express";
import logger from "../../core/logger/logger";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime(); // high-precision timer

  const requestId = (req as any).id; // set by requestId middleware

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const responseTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2); // ms

    logger.info(
      {
        requestId,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
      },
      "HTTP Request Completed"
    );
  });

  next();
}
