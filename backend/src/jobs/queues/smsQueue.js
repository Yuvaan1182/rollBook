const { Queue } = require('bullmq');
const { redis } = require('../../config/env');
const { SMS_QUEUE } = require('../../config/constants/queue');

const smsQueue = new Queue(SMS_QUEUE.name, {
  connection: {
    host: redis.host,
    port: redis.port
  },
  defaultJobOptions: SMS_QUEUE.defaultJobOptions
});

module.exports = smsQueue;