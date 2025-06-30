const { sms } = require("./env");

module.exports = {
  email: {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000
  },
  stripe: {
    timeout: 4000,
    errorThresholdPercentage: 40,
    resetTimeout: 15000
  },
  openai: {
    timeout: 5000,
    errorThresholdPercentage: 30,
    resetTimeout: 20000
  },
  sms: {
    timeout: sms.timeout || 3000,
    errorThresholdPercentage: sms.errorThresholdPercentage || 50,
    resetTimeout: sms.resetTimeout || 10000
  },
};
