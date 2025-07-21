const crypto = require("crypto");
const bcrypt = require("bcrypt");
const redisService = require("../../config/redis.config");
const { otp: otpConfig } = require("../../config/env.config");
const { MAX_ATTEMPTS, MAX_PER_IP, BLACKLIST_DURATION } = require("../../config/constants");

// Helper to get Redis key
const getVal = (key) => redisService.getKey(key);

// Secure OTP Generator using crypto
function generateOtp(length = otpConfig.length) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[crypto.randomInt(0, digits.length)];
  }
  return otp;
}

// OTP Store
const otpStore = {
  async store({ key, val, expiry = otpConfig.expiry }) {
    if (!key || !val) {
      throw new Error("Key and value are required to store OTP");
    }
    try {
      const client = await redisService.connect();
      await client.set(getVal(key), val, { EX: expiry });
    } catch (error) {
      console.error("❌ Error storing OTP:", error);
      throw new Error("Failed to store OTP");
    }
  },

  async invalidate(key) {
    try {
      const client = await redisService.connect();
      await client.del(getVal(key));
    } catch (error) {
      console.error("❌ Error invalidating OTP:", error);
      throw new Error("Failed to invalidate OTP");
    }
  },

  async validate(key, inputOtp) {
    try {
      const client = await redisService.connect();
      const hashedOtp = await client.get(getVal(key));
      if (!hashedOtp) return false;
      return await bcrypt.compare(inputOtp, hashedOtp);
    } catch (error) {
      console.error("❌ Error validating OTP:", error);
      return false;
    }
  },

  async getTTL(key) {
    try {
      const client = await redisService.connect();
      return await client.ttl(getVal(key));
    } catch (error) {
      console.error("❌ Error getting TTL for OTP:", error);
      return -2; // Redis TTL return -2 if key does not exist
    }
  },

  async isCooldownActive(key) {
    try {
      const client = await redisService.connect();
      const ttl = await client.ttl(getVal(key));
      return ttl > otpConfig.expiry - otpConfig.cooldown;
    } catch (error) {
      console.error("❌ Error checking cooldown:", error);
      return false;
    }
  },

  async get(key) {
    try {
      const client = await redisService.connect();
      return await client.get(getVal(key));
    } catch (error) {
      console.error("❌ Error fetching OTP from Redis:", error);
      return null;
    }
  }
};

// OTP Throttle and Limiter
const otpLimiter = {
  async incrementAttempts(identifier, prefix, userId) {
    try {
      const client = await redisService.connect();
      const attemptKey = getVal(`${identifier}:${prefix}:${userId}`);
      const attempts = await client.incr(attemptKey);
      if (attempts === 1) await client.expire(attemptKey, otpConfig.expiry);
      if (attempts > MAX_ATTEMPTS) {
        throw new Error("Too many failed attempts. Try again later.");
      }
      return attempts;
    } catch (error) {
      console.error("❌ Error in incrementAttempts:", error);
      throw new Error("OTP attempt tracking failed.");
    }
  },

  async checkIpThrottle(identifier, prefix, ip) {
    try {
      const client = await redisService.connect();
      const ipKey = getVal(`${identifier}:${prefix}:${ip}`);
      const count = await client.incr(ipKey);
      if (count === 1) await client.expire(ipKey, otpConfig.expiry);
      if (count > MAX_PER_IP) {
        const blockKey = getVal(`${identifier}::${ip}`);
        await client.set(blockKey, "1", { EX: BLACKLIST_DURATION });
        throw new Error("Too many OTP requests from this IP.");
      }
    } catch (error) {
      console.error("❌ Error in checkIpThrottle:", error);
      throw new Error("IP rate limiting failed.");
    }
  },

  async isIpBlacklisted(identifier, prefix, ip) {
    try {
      const client = await redisService.connect();
      return await client.exists(getVal(`${identifier}::${ip}`));
    } catch (error) {
      console.error("❌ Error in isIpBlacklisted:", error);
      return false;
    }
  }
};

module.exports = {
  generateOtp,
  otpStore,
  otpLimiter
};
