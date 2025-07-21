// src/config/env.js
module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_jwt_secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  db: {
    type: process.env.DB_TYPE || "mongo",
    mongoURI: process.env.MONGO_URI,
    postgresURI: process.env.POSTGRES_URI,
  },
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    prefix: process.env.REDIS_PREFIX || "INVOXY_",
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD || "",
  },
  otp: {
    length: parseInt(process.env.OTP_LENGTH || "6"),
    expiry: parseInt(process.env.OTP_EXPIRY || "300"), // in seconds
    cooldown: parseInt(process.env.OTP_COOLDOWN || "60"), // in seconds
    maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS || "5"),
    maxPerIp: parseInt(process.env.OTP_MAX_PER_IP || "10"),
    blacklistDuration: parseInt(process.env.OTP_BLACKLIST_DURATION || "3600"), // in seconds
    pendingUserExpiry: parseInt(process.env.PENDING_USER_EXPIRY || "3600"), // in seconds
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
    },
  },
  react: {
    url: process.env.REACT_FRONTEND_URL || "http://localhost:3000",
  },
  oauth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/v1/auth/google/callback",
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || "/api/v1/auth/github/callback",
    },
  },
  smsProvider: process.env.SMS_PROVIDER || "twilio",

  // Third-party API base URLs
  twilioBaseUrl: process.env.TWILIO_API_BASE,
  stripeBaseUrl: process.env.STRIPE_API_BASE,
  msg91BaseUrl: process.env.MSG91_API_BASE,

  // Third-party API keys
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  email: {
    provider: process.env.EMAIL_PROVIDER,
    apiKey: process.env.EMAIL_API_KEY,
  },

  // Email providers configuration
  emailProviders: {
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      baseUrl: process.env.SENDGRID_API_BASE || "https://api.sendgrid.com/v3/",
      sendEmail: "/mail/send",
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY || "NULL",
      senderEmail: process.env.RESEND_SENDER_EMAIL || "NULL",
    },
  },
};
