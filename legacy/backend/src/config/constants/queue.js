const { name } = require("../../services/breakers/smsBreaker");

module.exports = {
  EMAIL_QUEUE: {
    name: 'emailQueue',
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000, // 3 seconds
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  },
  SMS_QUEUE: {
    name: 'smsQueue',
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000, // 2 seconds
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  },
};
