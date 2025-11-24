const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // collects CPU, memory, event loop lag, etc.

// Custom metrics
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5]
});

// Middleware to track metrics per request
function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
    httpRequestDuration.labels(req.method, req.path, res.statusCode).observe(duration);
  });

  next();
}

// Expose `/metrics` endpoint
function metricsEndpoint(req, res) {
  res.set("Content-Type", client.register.contentType);
  res.end(client.register.metrics());
}

module.exports = { metricsMiddleware, metricsEndpoint };
