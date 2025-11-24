const config = require("../../config/breaker.config").sms;
const createBreaker = require("../../utils/circuitBreakerFactory");
const { sendSmsWithFallback } = require("../sms/sendSmsWithFallback");

module.exports = createBreaker(sendSmsWithFallback, "sms", config);
