module.exports = {
  OTP_EXPIRY: 5 * 60,          // 5 minutes
  RESEND_COOLDOWN: 60,         // 1 minute
  EMAIL_OTP_PREFIX: "otp:email:",
  PHONE_OTP_PREFIX: "otp:phone:",
  RATE_LIMIT_WINDOW: 60 * 1000 // 1 minute in ms
};
