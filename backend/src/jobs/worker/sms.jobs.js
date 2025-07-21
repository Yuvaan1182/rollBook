const { Worker } = require("bullmq");
const { redis: redisConfig } = require("../../config/env");
const smsBreaker = require("../../services/breakers/smsBreaker");

const smsWorker = new Worker(
  "smsQueue",
  async (job) => {
    const payload = job.data;

    try {
      console.log(`📨 Sending OTP to: ${payload.to}`);
      await smsBreaker.fire(payload);
      console.log(`✅ Sms sent to: ${payload.to}`);
    } catch (err) {
      console.error(`❌ Failed to send sms to ${payload.to}:`, err.message);
      throw err;
    }
  },
  {
    connection: { url: redisConfig.url },
  }
);

// Optional logging
smsWorker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

smsWorker.on("failed", (job, err) => {
  console.error(`🔥 Job ${job.id} failed:`, err.message);
});

module.exports = smsWorker;
