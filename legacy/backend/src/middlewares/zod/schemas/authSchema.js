const { z } = require("zod");

// User Signup Schema
const userSignupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8).max(128),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, "Invalid phone number format")
    .optional(),
  countryCode: z.string().min(1).max(10).optional(),
});

// User Login Schema
const userLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

// Login with Mobile OTP (request OTP)
const loginMobileOtpSchema = z.object({
  phone: z.string().regex(/^\+?[0-9]{7,15}$/),
});

// Verify Mobile OTP
const verifyMobileOtpSchema = z.object({
  phone: z.string().regex(/^\+?[0-9]{7,15}$/),
  otp: z.string().min(4).max(8),
});

// Login with Email OTP
const loginEmailOtpSchema = z.object({
  email: z.email(),
  otp: z.string().min(4).max(8),
});

// Verify Email OTP
const verifyEmailOtpSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  otp: z.string().min(4).max(8),
});

// enable 2fa
const initialize2FASchema = z
  .object({
    email: z.email({ message: "Invalid email format" }).optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/)
      .optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email"], // you could also use ["phone"]
  });

// verify 2fa schema
const verify2FASchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  token: z.string().length(6, "Token must be a 6-digit code"),
});

const resendOtpSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
});

// Combine all schemas into a single object for easy export
const authSchema = {
  userSignup: userSignupSchema,
  userLogin: userLoginSchema,
  loginMobileOtp: loginMobileOtpSchema,
  verifyMobileOtp: verifyMobileOtpSchema,
  resendOtp: resendOtpSchema,
  loginEmailOtp: loginEmailOtpSchema,
  verifyEmailOtp: verifyEmailOtpSchema,
  init: initialize2FASchema,
  verify2FA: verify2FASchema,
};

// Export all schemas in a modular way
module.exports = authSchema;
