// email.js
// Unified email store and limiter logic
const redis = require('../../config/redis');

const EMAIL_PREFIX = 'email_attempts:';
const getEmailKey = (identifier) => `${EMAIL_PREFIX}${identifier}`;

const incrementEmailAttempts = async (identifier, windowSec) => {
  const key = getEmailKey(identifier);
  const attempts = await redis.incr(key);
  if (attempts === 1) {
    await redis.expire(key, windowSec);
  }
  return attempts;
};

const getEmailAttempts = async (identifier) => {
  const key = getEmailKey(identifier);
  const attempts = await redis.get(key);
  return parseInt(attempts, 10) || 0;
};

const resetEmailAttempts = async (identifier) => {
  const key = getEmailKey(identifier);
  await redis.del(key);
};

/**
 * Email limiter middleware factory
 * @param {Object} options
 * @param {function(req): string} options.identifierFn - Function to extract identifier (userId, email, etc.) from request
 * @param {number} options.windowSec - Time window in seconds
 * @param {number} options.max - Max allowed attempts in window
 * @param {string} [options.message] - Custom error message
 */
function createEmailLimiter({ identifierFn, windowSec = 3600, max = 5, message }) {
  return async function emailLimiter(req, res, next) {
    try {
      const identifier = identifierFn(req);
      if (!identifier) {
        return res.status(400).json({ message: 'Missing identifier for email rate limiting.' });
      }
      const attempts = await incrementEmailAttempts(identifier, windowSec);
      if (attempts > max) {
        return res.status(429).json({
          message: message || 'Too many email requests. Please try again later.',
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  incrementEmailAttempts,
  getEmailAttempts,
  resetEmailAttempts,
  createEmailLimiter,
};
