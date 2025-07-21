const client = require("prom-client");

// OTP sent count
const otpSentCounter = new client.Counter({
  name: "otp_sent_total",
  help: "Total number of OTPs sent",
  labelNames: ["channel", "status"], // channel: sms/email, status: success/fail
});

// Email delivery
const emailSentCounter = new client.Counter({
  name: "email_sent_total",
  help: "Total emails sent",
  labelNames: ["provider", "status"], // status: success/fail
});

// Job processing time
const jobDuration = new client.Histogram({
  name: "job_duration_seconds",
  help: "Duration of background jobs",
  labelNames: ["queue", "name", "status"],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Export metric instances
module.exports = {
  otpSentCounter,
  emailSentCounter,
  jobDuration,
};
