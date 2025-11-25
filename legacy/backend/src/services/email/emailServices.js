const emailQueue = require('../jobs/queues/emailQueue');

async function queueEmail(payload) {
  await emailQueue.add('sendEmail', payload);
}