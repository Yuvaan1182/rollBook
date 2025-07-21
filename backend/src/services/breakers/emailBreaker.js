const config = require("../../config/breaker.config").email;
const createCircuitBreaker = require("../../utils/circuitBreakerFactory");
const sendEmailWithFallback = require("../email/sendEmailWithFallback");

const emailBreaker = createCircuitBreaker(sendEmailWithFallback, "email", config);

module.exports = emailBreaker;
