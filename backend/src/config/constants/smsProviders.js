module.exports = {
  providers: ["twilio", "msg91"], // priority
  configs: {
    twilio: {
      timeout: 4000,
      retries: 2,
      backoff: 1000
    },
    msg91: {
      timeout: 5000,
      retries: 1,
      backoff: 1500
    }
  }
};
