const winston = require("winston");
const { nodeEnv } = require("../../src/config/env");

// Log format: JSON with timestamp
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Transport configs
const transports = [];

if (nodeEnv === "development") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
} else {
  // Production / Test
  transports.push(
    new winston.transports.Console({ format: logFormat })
  );
}

const logger = winston.createLogger({
  level: nodeEnv === "production" ? "info" : "debug",
  format: logFormat,
  transports
});

module.exports = logger;
