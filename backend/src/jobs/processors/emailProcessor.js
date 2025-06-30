const { Worker } = require('bullmq');
const { redis } = require('../../config/env');
const { sendEmailWithFallback } = require('../../utils/email/sendEmailWithFallback');
const logger = require('../../lib/logger');

const emailWorker = new Worker('emailQueue', async (job) => {
  try {
    await sendEmailWithFallback(job.data);
    logger.info(`✅ Email sent via fallback logic for job ${job.id}`);
  } catch (error) {
    logger.error(`❌ Email failed in fallback logic for job ${job.id}:`, error.message);
    throw error; // allow BullMQ to handle retries
  }
}, {
  connection: {
    host: redis.host,
    port: redis.port
  }
});

module.exports = emailWorker;
