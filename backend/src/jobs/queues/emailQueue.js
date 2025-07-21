const { Queue } = require('bullmq');
const { redis } = require('../../config/env.config');
const { EMAIL_QUEUE } = require('../../config/constants/queue');

const emailQueue = new Queue(EMAIL_QUEUE.name, {
  connection: {
    host: redis.host,
    port: redis.port
  },
  defaultJobOptions: EMAIL_QUEUE.defaultJobOptions
});

module.exports = emailQueue;
