const { Queue } = require('bullmq');
const { redis } = require('../../config/env');
const { EMAIL_QUEUE } = require('../../config/constants/queues');

const emailQueue = new Queue(EMAIL_QUEUE.name, {
  connection: {
    host: redis.host,
    port: redis.port
  },
  defaultJobOptions: EMAIL_QUEUE.defaultJobOptions
});

module.exports = emailQueue;
