const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const { nodeEnv } = require("./config/env.config");

// Importing the metrics middleware for Prometheus
const { metricsMiddleware, metricsEndpoint } = require("./lib/logger/metric");

const app = express();
const isProd = nodeEnv === "production";

// Global Middleware
app.use(cors());

// Logging
app.use(morgan(isProd ? "combined" : "dev"));


if (isProd) {
  // Security Headers
  app.use(helmet());
  // GZIP Compression
  app.use(compression());
  // 📊 Prometheus Metrics Middleware
  app.use(metricsMiddleware);
  app.get("/metrics", metricsEndpoint);
}


app.use((req, res, next) => {
  console.log(`🧭 Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Main API Router
const mainRouter = require("./routes/index.route");

app.use("/api/v1", mainRouter);
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
