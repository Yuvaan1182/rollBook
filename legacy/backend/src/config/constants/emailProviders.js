module.exports = {
  providers: ["resend", "sendgrid"], // priority order
  configs: {
    resend: {
      timeout: 4000,
      retries: 2,
      backoff: 1000
    },
    sendgrid: {
      timeout: 5000,
      retries: 1,
      backoff: 1500
    }
  }
};
