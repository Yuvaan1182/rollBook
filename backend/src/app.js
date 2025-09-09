const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const { nodeEnv } = require("./config/env");
// const { metricsMiddleware } = require("./lib/metrics");

const app = express();
const isProd = nodeEnv === "production";

// Global Middleware
app.use(cors());
app.use(express.json());

// Logging
app.use(morgan(isProd ? "combined" : "dev"));

// Security Headers
app.use(helmet());

// GZIP Compression
if (isProd) {
  app.use(compression());
}

// 📊 Prometheus Metrics Middleware
// app.use(metricsMiddleware);

// Main API Router
const mainRouter = require("./routes/index");
app.use("/api/v1", mainRouter);

module.exports = app;
