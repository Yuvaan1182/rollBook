const client = require("prom-client");

// Enable collection of default metrics like CPU, memory, etc.
client.collectDefaultMetrics();

// Custom metrics: HTTP request duration
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 300, 500, 1000, 2000] // ms
});

module.exports = {
  httpRequestDurationMicroseconds,
  metricsMiddleware: (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      httpRequestDurationMicroseconds
        .labels(req.method, req.route?.path || req.path, res.statusCode)
        .observe(duration);
    });

    next();
  },
  promClient: client
};
