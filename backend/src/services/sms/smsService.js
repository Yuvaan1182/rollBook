const generateOtp = require("../../utils/otp/otp");
const smsBreaker = require("./smsBreaker");

// OTP Store abstraction
const { otpStore, otpLimiter } = require("../../utils/otp/otp");

// SMS OTP Service
const smsService = {
  async sendOtp(phone, userId) {
    const isCooldownActive = await otpStore.isCooldownActive(userId);
    if (isCooldownActive) {
      const cooldown = await otpStore.getTTL(userId);
      throw new Error(`Wait ${cooldown}s before retrying`);
    }
    const otp = generateOtp(otpEnv.length);
    const message = `Your OTP is ${otp}. It will expire in 5 minutes.`;
    await smsBreaker.fire({ to: phone, body: message });
    await otpStore.store({userId, otp, expiry: 300}); // Store OTP for 5 minutes
  },
  async verifyOtp(userId, inputOtp) {
    await otpLimiter.incrementAttempts("otp", "attempts", userId);
    const storedOtp = await otpStore.getOtp(userId);
    if (!storedOtp) throw new Error("OTP expired or not found");
    if (storedOtp !== inputOtp) throw new Error("Incorrect OTP");
    await otpStore.invalidate(userId);
  }
};

module.exports = smsService;
