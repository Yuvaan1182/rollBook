import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

export function createApp() {
  const app = express();
  app.use(cors()); // for white listing servers | request methods | headers | api end-points
  app.use(helmet);
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/api", routes);

  return app;
}
