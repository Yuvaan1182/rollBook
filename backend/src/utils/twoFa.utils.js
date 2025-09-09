const User = require("../models/user.model");
const { generate2FASecret, verify2FAToken } = require("../services/twofa.service");
const { generateQRCodeURL } = require("../utils/qr.util");

exports.initiate2FA = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const { base32, otpauth_url } = generate2FASecret(email);
  const qrCode = await generateQRCodeURL(otpauth_url);

  user.twoFASecret = base32;
  user.is2FAEnabled = true;
  await user.save();

  return res.status(200).json({
    message: "2FA setup initiated",
    qrCode,
  });
};

exports.verify2FA = async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({ email });
  if (!user?.twoFASecret) return res.status(400).json({ error: "2FA not setup" });

  const isValid = verify2FAToken(user.twoFASecret, token);

  if (!isValid) return res.status(401).json({ error: "Invalid token" });

  // 2FA passed. Continue with session/login/etc.
  return res.status(200).json({ message: "2FA verified" });
};

exports.disable2FA = async (req, res) => {
  const { email } = req.body;

  await User.updateOne({ email }, { $unset: { twoFASecret: 1 }, is2FAEnabled: false });

  return res.status(200).json({ message: "2FA disabled" });
};
