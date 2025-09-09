const redisService = require("../../config/redis");

/**
 * Email throttle middleware factory
 * @param {Object} options
 * @param {string} options.prefix - Redis key prefix (default: 'email')
 * @param {string} options.identifier - req property to use as identifier (e.g., 'user.id', 'body.email')
 * @param {number} options.max - Max emails allowed in window
 * @param {number} options.expiry - Window in seconds
 */
function emailThrottleMiddleware({ prefix = 'email', identifier = 'user.id', max = 5, expiry = 60 } = {}) {
  return async (req, res, next) => {
    // Resolve identifier from req (supports nested, e.g., 'user.id')
    const id = identifier.split('.').reduce((obj, key) => obj && obj[key], req);
    if (!id) {
      return res.status(400).json({ error: 'Invalid identifier for email throttle.' });
    }
    const key = redisService.getKey(`${prefix}:throttle:${id}`);
    const client = await redisService.connect();
    const count = await client.incr(key);
    if (count === 1) await client.expire(key, expiry);
    if (count > max) {
      return res.status(429).json({ error: 'Too many email requests. Please try again later.' });
    }
    next();
  };
}

module.exports = emailThrottleMiddleware;
