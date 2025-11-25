import pinoHttp from "pino-http";
import { v4 as uuid } from "uuid";
import logger from "./logger";

const httpLogger = pinoHttp({
  logger,
  genReqId: () => uuid(),
  customSuccessMessage: (res) => {
    return `Request completed with status ${res.statusCode}`;
  },
  customErrorMessage: (err, res) => {
    return `Request error with status ${err.statusCode}: ${err.statusMessage}`;
  },
  customAttributeKeys: {
    req: "request",
    res: "response",
    err: "error",
  },
});
