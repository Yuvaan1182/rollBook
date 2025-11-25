const sendEmail = require("./sendEmail");
const config = require("../../config/breakerConfig").email;
const createCircuitBreaker = require("../../utils/circuitBreakerFactory");

const emailBreaker = createCircuitBreaker(sendEmail, "email", config);

module.exports = emailBreaker;
