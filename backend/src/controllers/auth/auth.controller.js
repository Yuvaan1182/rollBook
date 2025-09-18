const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import models
const User = require("../../models/user.model");

// Load environment variables
const jwtEnv = require("../../config/env.config").jwt;
const bcryptEnv = require("../../config/env.config").bcrypt;
const otpEnv = require("../../config/env.config").otp;
const reactEnv = require("../../config/env.config").react;
const nodeEnv = require("../../config/env.config").nodeEnv;
const from = require("../../config/env.config").emailProviders.resend
  .senderEmail;

// import services
const redis = require("../../config/redis.config");
const { generateOtp, otpStore } = require("../../utils/otp/otp");
const {
  generate2FASecret,
  verify2FAToken,
} = require("../../services/twofa/twofa.service");

// importing queues
const emailQueue = require("../../jobs/queues/emailQueue");

// importing public templates
const {
  emailOtpTemplate,
} = require("../../../public/email-templates/templates");

// import utils
const {
  successResponse,
  errorResponse,
} = require("../../utils/response.utils");
const { generateQRCodeURL } = require("../../utils/qr.utils");

const authController = {
  // Register a new user using email+password
  registerUsingMail: async (req, res) => {
    try {
      const { email, password, ...rest } = req.body;
      console.log(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(
          res,
          "Email already in use",
          { message: "EMAIL_ALREADY_REGISTERED" },
          409
        );
      }
      const hashedPassword = await bcrypt.hash(password, bcryptEnv.saltRounds);
      // store user temporarily in redis
      const user = {
        email: email,
        password: hashedPassword,
        ...rest,
      };

      await redis.setJSON(`PENDING_USER:${email}`, user, {
        EX: otpEnv.pendingUserExpiry,
      });

      // Generate OTP
      const otp = generateOtp();

      console.log("Generated OTP:", otp);

      // Send otp via email payload to email queue
      const emailQueue = require("../../jobs/queues/emailQueue");
      const html = emailOtpTemplate(otp);
      const payload = {
        to: email,
        subject: "Invoxy Email Verification Mail",
        otp: otp, // still useful for future reference
        type: "otp-verification", // still useful for future reference
        from: from,
        html: html,
        text: `Invoxy, Verify Your Email, Use the following OTP to verify your email address:${otp}
          This OTP is valid for 5 minutes. Do not share this code with anyone.
          If you didn’t request this, please ignore this message.
        © 2025 Invoxy. All rights reserved.
        support@invoxyapp.com`,
      };

      await emailQueue.add("sendVerificationOtp", payload);

      // store OTP in redis
      const hashedOtp = await bcrypt.hash(otp, bcryptEnv.saltRounds);
      await otpStore.store({
        key: `REGISTER_EMAIL_OTP:${email}`,
        val: hashedOtp,
      });

      const message =
        "Verification email sent. Please verify your email to complete registration.";
      return successResponse(res, message, null, 201);
    } catch (err) {
      const errMsg =
        "REGISTERUSINGMAIL: Error in Verifying User through email + password";
      return errorResponse(res, errMsg, err, 400);
    }
  },

  // Verify email and complete registration
  verifyEmailOnSignup: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const pendingKey = `PENDING_USER:${email}`;
      const otpKey = `EMAIL_OTP:${email}`;

      const user = await redis.getJSON(pendingKey);
      if (!user) {
        return errorResponse(
          res,
          "Invalid or expired verification link",
          { message: "PENDING_USER_EXPIRED_OR_MISSING" },
          400
        );
      }

      const isValidOtp = await otpStore.validate(otpKey, otp);
      if (!isValidOtp) {
        return errorResponse(
          res,
          "Invalid OTP. Please check and try again.",
          { message: "INVALID_OTP" },
          400
        );
      }

      await otpStore.invalidate(otpKey);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(
          res,
          "Email is already registered",
          {
            message: "EMAIL_ALREADY_REGISTERED",
            type: "Conflict",
            stack: null,
          },
          409
        );
      }

      const newUser = new User({ ...user, isEmailVerified: true });
      const savedUser = await newUser.save();

      await redis.del(pendingKey);

      const token = jwt.sign({ id: savedUser._id }, jwtEnv.secret, {
        expiresIn: jwtEnv.expiresIn,
      });

      return successResponse(
        res,
        "Registration successful. You can now log in.",
        {
          message: "Registration successful",
          token,
          user: savedUser,
        },
        201
      );
    } catch (err) {
      console.error("📛 Email verification error:", err);
      return errorResponse(
        res,
        "An unexpected error occurred during verification.",
        err,
        500
      );
    }
  },

  // login user using email+password+otp
  loginUsingMail: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return errorResponse(
          res,
          "Invalid Credentials",
          { message: "INVALID_CREDENTIALS" },
          401
        );

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return errorResponse(
          res,
          "Invalid Credentials",
          { message: "INVALID_CREDENTIALS" },
          401
        );

      // Generate OTP
      const otp = generateOtp();
      const hashedOtp = await bcrypt.hash(otp, bcryptEnv.saltRounds);
      otpStore.store({
        key: `LOGIN_EMAIL_OTP:${email}`,
        val: hashedOtp,
      });

      // Send OTP email
      await emailQueue.add("sendLoginOtp", {
        to: email,
        subject: "Invoxy Login OTP",
        from: from,
        otp,
        type: "login-verification",
        html: emailOtpTemplate(otp, "login"),
        text: `Your login OTP is ${otp}`,
      });

      return successResponse(
        res,
        "OTP sent to your email. Please verify to complete login",
        null,
        200
      );
    } catch (err) {
      console.error("Login error:", err);
      return errorResponse(res, "Login failed. Please try again", err, 500);
    }
  },

  // Verify email and complete login
  verifyEmailOnSignin: async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log("Verifying OTP for user:", req.body);

      const user = await User.findOne({ email });
      if (!user)
        return errorResponse(
          res,
          "User not found",
          { message: "USER_NOT_FOUND" },
          404
        );

      // marked isValid true for debugging
      const isValid =
        true || (await otpStore.validate(`LOGIN_EMAIL_OTP:${email}`, otp));
      if (!isValid)
        return errorResponse(
          res,
          "Invalid or expired OTP",
          { message: "INVALID_OTP" },
          400
        );

      // added isValid check for debugging
      !isValid && (await otpStore.invalidate(`LOGIN_EMAIL_OTP:${email}`));

      // Generate JWT
      const token = jwt.sign({ id: user._id }, jwtEnv.secret, {
        expiresIn: jwtEnv.expiresIn,
      });

      return successResponse(res, "Login successful", {
        message: "Login successful",
        token,
        user,
      });
    } catch (err) {
      console.error("OTP Verification Error:", err);
      return errorResponse(res, "Failed to verify OTP", err, 500);
    }
  },

  // Enable 2FA authentication using auth app
  initiate2FA: async (req, res) => {
    try {
      const { email, phone } = req.body;
      const user = await User.findOne({ $or: [{ email }, { phone }] });
      if (!user) {
        return errorResponse(
          res,
          "User not found",
          { message: "USER_NOT_FOUND" },
          404
        );
      }

      const { base32, otpauth_url } = generate2FASecret(email);
      const qrCode = await generateQRCodeURL(otpauth_url);

      user.twoFASecret = base32;
      user.is2FAEnabled = true;
      user.twoFAMethods = "auth_app";
      await user.save();

      return successResponse(res, "2FA setup initiated", { qrCode }, 200);
    } catch (err) {
      return errorResponse(res, "Failed to initiate 2FA", err, 500);
    }
  },

  // 2fa verification
  verify2FA: async (req, res) => {
    try {
      const { email, token } = req.body;
      const user = await User.findOne({ email });
      if (!user?.twoFASecret) {
        return errorResponse(
          res,
          "2FA not setup",
          { message: "2FA_NOT_SETUP" },
          400
        );
      }

      const isValid = verify2FAToken(user.twoFASecret, token);
      if (!isValid) {
        return errorResponse(
          res,
          "Invalid token",
          { message: "INVALID_2FA_TOKEN" },
          401
        );
      }

      // 2FA passed. Continue with session/login/etc.
      return successResponse(res, "2FA verified", null, 200);
    } catch (err) {
      return errorResponse(res, "Failed to verify 2FA", err, 500);
    }
  },

  // disable 2fa
  disable2FA: async (req, res) => {
    try {
      const { email } = req.body;
      await User.updateOne(
        { email },
        { $unset: { twoFASecret: 1 }, is2FAEnabled: false }
      );
      return successResponse(res, "2FA disabled", null, 200);
    } catch (err) {
      return errorResponse(res, "Failed to disable 2FA", err, 500);
    }
  },

  // google oauth strategy
  googleOAuth: async (req, res) => {
    try {
      const id = req.user._id;
      const token = jwt.sign({ id: id }, jwtEnv.secret, {
        expiresIn: jwtEnv.expiresIn,
      });

      res.redirect(`${reactEnv.url}?token=${token}`);
    } catch (err) {
      errorResponse(res, "Google OAuth failed", err, 500);
    }
  },

  // github oauth strategy
  githubOAuth: async (req, res) => {
    try {
      const id = req.id;
      const token = jwt.sign({ id: id }, jwtEnv.secret, {
        expiresIn: jwtEnv.expiresIn,
      });

      if (nodeEnv === "development") {
        res.json({ token, user: req.user });
        return;
      }

      res.redirect(`${reactEnv.url}?token=${token}`);
    } catch (err) {
      errorResponse(res, "GitHub OAuth failed", err, 500);
    }
  },
};

module.exports = authController;
