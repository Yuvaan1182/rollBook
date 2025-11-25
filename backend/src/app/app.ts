import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { requestId } from "./middleware/requestId.middleware";
import { requestLogger } from "./middleware/requestLogger.middleware";
import errorHandler from "./middleware/error.middleware";

export function createApp() {
  const app = express();
  // Security + CORS + Body parsing
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("dev"));

  // Must run BEFORE routes
  app.use(requestId); // assigns req.id
  app.use(requestLogger); // logs each request (start)

  // Routes
  app.use("/api", routes);

  // Error Handler (must be last)
  app.use(errorHandler);

  return app;
}
