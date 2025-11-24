const client = require("prom-client");
const { metricsMiddleware } = require("./defaultMetrics");
const customMetrics = require("./customMetrics");

function metricsEndpoint(req, res) {
  res.set("Content-Type", client.register.contentType);
  res.end(client.register.metrics());
}

module.exports = {
  metricsMiddleware,
  metricsEndpoint,
  ...customMetrics,
};
