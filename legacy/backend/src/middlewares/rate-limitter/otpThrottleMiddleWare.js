const { otpLimiter } = require("../../utils/otp/otp");

const otpThrottleMiddleWare = async (req, res, next) => {
  // In your route/controller for requesting OTP
  await otpLimiter.checkIpThrottle("otp", "ip", req.ip);
  if (await otpLimiter.isIpBlacklisted("otp", "blacklist", req.ip)) {
    return res
      .status(429)
      .json({ error: "Too many OTP requests from this IP." });
  }
  // Proceed to generate and send OTP
  next();
};

module.exports = {
  otpThrottleMiddleWare,
};