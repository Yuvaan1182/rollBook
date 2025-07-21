const express = require("express");

const router = express.Router();

// Import controllers
const authController = require("../controllers/auth/auth.controller");

// Import middleware
const { validate } = require("../middlewares/zod/inputValidator.middleware");
const { createAuthMiddleware } = require("../middlewares/auth/auth.middleware");

// Import Zod schemas
const authSchema = require("../middlewares/zod/schemas/authSchema");

// Import JWT environment variables
const jwt = require("../config/env.config").jwt;

// import strategies
const passport = require("../config/passport.config");

// Register a new user
router.post(
  "/register/email-password",
  validate(authSchema.userSignup, "body"),
  authController.registerUsingMail
);

// Verify email and complete registration
router.post(
  "/register/verify-email",
  validate(authSchema.verifyEmailOtp, "body"),
  authController.verifyEmailOnSignup
);

// Login user
router.post(
  "/login/email-password",
  validate(authSchema.userLogin, "body"),
  authController.loginUsingMail
);

// verify user login otp
router.post(
  "/login/verify-otp",
  validate(authSchema.loginEmailOtp),
  authController.verifyEmailOnSignin
);

// enable 2fa
router.post(
  "/login/enable-2fa",
  validate(authSchema.init),
  createAuthMiddleware({ secret: jwt.secret }),
  authController.initiate2FA
);

// verify 2fa
router.post(
  "/login/verify-2fa",
  validate(authSchema.verify2FA),
  createAuthMiddleware({ secret: jwt.secret }),
  authController.verify2FA
);

// disable 2fa
router.post("/login/disable-2fa", createAuthMiddleware({secret: jwt.secret}), authController.disable2FA);

// OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback handler route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  authController.googleOAuth
);

// GitHub login route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/" }),
  authController.githubOAuth
);

module.exports = router;
