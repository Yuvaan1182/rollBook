const sendSms = require("./sendSMS");
const config = require("../../config/breakerConfig").sms;
const createBreaker = require("../../utils/circuitBreakerFactory");

module.exports = createBreaker(sendSms, "sms", config);
