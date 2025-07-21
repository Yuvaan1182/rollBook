// emailLimiter.js
// Configurable email send limiter using emailStore and Redis
const {
  incrementEmailAttempts,
  getEmailAttempts,
} = require('../../utils/email/emailStore');

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

module.exports = { createEmailLimiter };

// Moved to utils/email/email.js
// (This file is now obsolete and can be deleted)
