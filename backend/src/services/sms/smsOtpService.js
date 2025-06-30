const { connectRedis, getKey } = require("../../config/connectRedis");
const generateOtp = require("../../utils/otp");
const smsBreaker = require("./smsBreaker");
const { OTP_EXPIRY, RESEND_COOLDOWN } = require("../../config/constants");

const sendSmsOtp = async (phone) => {
  const redis = await connectRedis();
  const key = getKey(`otp:phone:${phone}`);
  const cooldownKey = getKey(`otp:cooldown:phone:${phone}`);

  // Check resend cooldown
  const cooldown = await redis.ttl(cooldownKey);
  if (cooldown > 0) {
    throw new Error(`Wait ${cooldown}s before retrying`);
  }

  const otp = generateOtp();
  const message = `Your OTP is ${otp}. It will expire in 5 minutes.`;

  // Send SMS via breaker
  await smsBreaker.fire({ to: phone, body: message });

  // Store in Redis
  await redis.setEx(key, OTP_EXPIRY, otp);
  await redis.setEx(cooldownKey, RESEND_COOLDOWN, 1);
};

const verifySmsOtp = async (phone, inputOtp) => {
  const redis = await connectRedis();
  const key = getKey(`otp:phone:${phone}`);
  const storedOtp = await redis.get(key);

  if (!storedOtp) throw new Error("OTP expired or not found");
  if (storedOtp !== inputOtp) throw new Error("Incorrect OTP");

  await redis.del(key); // clear after success
};

module.exports = {
  sendSmsOtp,
  verifySmsOtp
};
