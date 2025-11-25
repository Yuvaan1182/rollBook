// src/config/env.js
module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,

  db: {
    type: process.env.DB_TYPE || "mongo",
    mongoURI: process.env.MONGO_URI,
    postgresURI: process.env.POSTGRES_URI,
  },
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    prefix: process.env.REDIS_PREFIX || "freelanceapp_",
  },
  otp: {
    length: parseInt(process.env.OTP_LENGTH || "6"),
    expiry: parseInt(process.env.OTP_EXPIRY || "300"), // in seconds
    cooldown: parseInt(process.env.OTP_COOLDOWN || "60"), // in seconds
  },
  sms: {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  },
  llm: {
    defaultProvider: process.env.DEFAULT_LLM_PROVIDER || "gpt",
    apiKeys: {
      openai: process.env.OPENAI_API_KEY,
      claude: process.env.CLAUDE_API_KEY,
      perplexity: process.env.PERPLEXITY_API_KEY,
    }
  },
  smsProvider: process.env.SMS_PROVIDER || "twilio",

  // Third-party API base URLs
  twilioBaseUrl: process.env.TWILIO_API_BASE,
  resendBaseUrl: process.env.RESEND_API_BASE,
  stripeBaseUrl: process.env.STRIPE_API_BASE,
  msg91BaseUrl: process.env.MSG91_API_BASE,
  redisURL: process.env.REDIS_URL,

  // Third-party API keys
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  email: {
    provider: process.env.EMAIL_PROVIDER,
    apiKey: process.env.EMAIL_API_KEY,
  },
};
