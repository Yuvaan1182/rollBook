const redisService = require("../../config/redis");

/**
 * Modular, generic rate limiter middleware factory
 * @param {Object} options
 * @param {string} options.prefix - Key prefix for Redis (e.g., 'otp', 'login')
 * @param {string} options.identifier - The request property to use as the unique identifier (e.g., 'ip', 'user.id', 'body.email')
 * @param {number} options.max - Max allowed requests in window
 * @param {number} options.expiry - Window in seconds
 * @param {number} options.blockDuration - Block duration in seconds
 * @param {boolean} options.includeUrl - Whether to include the URL path in the rate limit key
 * @returns {Function} Express middleware
 */
function createRateLimiter({
  prefix = "rate",
  identifier = "ip",
  max = 5,
  expiry = 60,
  blockDuration = 300,
  includeUrl = false,
} = {}) {
  return async (req, res, next) => {
    // Support nested identifiers like 'user.id' or 'body.email'
    let id;
    if (identifier === "ip") {
      id = req.ip;
    } else if (identifier.startsWith("user.")) {
      id = req.user?.[identifier.split(".")[1]];
    } else if (identifier.startsWith("body.")) {
      id = req.body?.[identifier.split(".")[1]];
    } else {
      id = req[identifier];
    }
    if (!id) return res.status(400).json({ error: "Rate limit identifier missing." });

    // Optionally include the URL path in the key for per-route limiting
    const urlPart = includeUrl ? `:${req.path}` : "";
    const key = redisService.getKey(`${prefix}:${identifier}:${id}${urlPart}`);
    const blockKey = redisService.getKey(`${prefix}:block:${identifier}:${id}${urlPart}`);
    const client = await redisService.connect();

    // Check if blocked
    if (await client.exists(blockKey)) {
      return res.status(429).json({ error: "Too many requests. Try again later." });
    }

    // Increment and check count
    const count = await client.incr(key);
    if (count === 1) await client.expire(key, expiry);
    if (count > max) {
      await client.set(blockKey, "1", { EX: blockDuration });
      return res.status(429).json({ error: "Too many requests. Try again later." });
    }

    next();
  };
}

module.exports = createRateLimiter;
