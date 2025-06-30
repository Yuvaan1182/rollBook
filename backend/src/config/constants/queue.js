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
};
