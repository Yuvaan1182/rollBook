module.exports = {
  resend: {
    timeout: 4000,
    retries: 2,
    backoff: 1000 // ms
  },
  twilio: {
    timeout: 3000,
    retries: 3,
    backoff: 500
  },
  stripe: {
    timeout: 6000,
    retries: 2,
    backoff: 1500
  },
  msg91: {
    timeout: 4000,
    retries: 1,
    backoff: 750
  }
};
