require("dotenv").config();

const { Worker } = require("bullmq");
const { redis: redisConfig } = require("../../config/env.config");
const emailBreaker = require("../../services/breakers/emailBreaker");

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const payload = job.data;

    try {
      console.log(`📨 Sending OTP to: ${payload.to}`);
      console.log(`Sending email from: ${payload.from}`);
      await emailBreaker.fire(payload);
      console.log(`✅ Email sent to: ${payload.to}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${payload.to}:`, err.message);
      throw err;
    }
  },
  {
    connection: { url: redisConfig.url },
    limiter: {
      max: 1, // Max 1 job at a time
      duration: 1000, // per second
    },
  }
);

// Optional logging
emailWorker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`🔥 Job ${job.id} failed:`, err.message);
});

module.exports = emailWorker;
