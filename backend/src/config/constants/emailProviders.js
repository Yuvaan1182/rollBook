module.exports = {
  providers: ["resend"], // priority order, nodemailer for dev/test , "sendgrid", "nodemailer"
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
    },
    nodemailer: {
      timeout: 3000,
      retries: 0,
      backoff: 0
    }
  }
};
