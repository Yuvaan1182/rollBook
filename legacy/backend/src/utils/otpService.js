const crypto = require("crypto");
const { connectRedis, getKey } = require("../config/redis");
const { otp: otpConfig } = require("../config/env");
const { MAX_ATTEMPTS, MAX_PER_IP, BLACKLIST_DURATION } = require("../config/constants");

// 🔢 Generate numeric OTP
const generateOtp = (length = otpConfig.length) => {
  const digits = "0123456789";
  return Array.from({ length }, () =>
    digits[Math.floor(Math.random() * digits.length)]
  ).join("");
};

// 💾 Store OTP in Redis
const storeOtp = async ({ key, otp, expiry = otpConfig.expiry }) => {
  const client = await connectRedis();
  await client.set(getKey(key), otp, { EX: expiry });
};

// ❌ Invalidate OTP after success
const invalidateOtp = async (key) => {
  const client = await connectRedis();
  await client.del(getKey(key));
};

// ⏳ Check if resend cooldown is active
const isCooldownActive = async (key) => {
  const client = await connectRedis();
  const ttl = await client.ttl(getKey(key));
  return ttl > otpConfig.expiry - otpConfig.cooldown;
};

// ✅ Validate OTP
const validateOtp = async (key, inputOtp) => {
  const client = await connectRedis();
  const storedOtp = await client.get(getKey(key));
  return storedOtp && storedOtp === inputOtp;
};

// 📆 Get TTL for frontend cooldown timer
const getOtpTTL = async (key) => {
  const client = await connectRedis();
  return await client.ttl(getKey(key));
};

// 📛 Retry attempt limiter (per user)
const incrementOtpAttempts = async (userId) => {
  const client = await connectRedis();
  const attemptKey = getKey(`otp:attempts:${userId}`);
  const attempts = await client.incr(attemptKey);

  if (attempts === 1) {
    await client.expire(attemptKey, otpConfig.expiry); // match OTP TTL
  }

  if (attempts > MAX_ATTEMPTS) {
    throw new Error("Too many failed attempts. Try again later.");
  }

  return attempts;
};

// 🌐 IP Throttle check (per IP address)
const checkIpThrottle = async (ip) => {
  const client = await connectRedis();
  const ipKey = getKey(`otp:ip:${ip}`);
  const count = await client.incr(ipKey);

  if (count === 1) {
    await client.expire(ipKey, otpConfig.expiry);
  }

  if (count > MAX_PER_IP) {
    const blockKey = getKey(`otp:blacklist:${ip}`);
    await client.set(blockKey, "1", { EX: BLACKLIST_DURATION });
    throw new Error("Too many OTP requests from this IP.");
  }
};

// ❗ Check if IP is temporarily blocked
const isIpBlacklisted = async (ip) => {
  const client = await connectRedis();
  return await client.exists(getKey(`otp:blacklist:${ip}`));
};

module.exports = {
  generateOtp,
  storeOtp,
  invalidateOtp,
  validateOtp,
  isCooldownActive,
  getOtpTTL,
  incrementOtpAttempts,
  checkIpThrottle,
  isIpBlacklisted,
};
