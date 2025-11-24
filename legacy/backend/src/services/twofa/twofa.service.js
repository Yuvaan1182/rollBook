const speakeasy = require("speakeasy");

function generate2FASecret(email) {
  const secret = speakeasy.generateSecret({
    name: `Invoxy (${email})`,
    length: 32,
  });

  return {
    base32: secret.base32,
    otpauth_url: secret.otpauth_url,
  };
}

function verify2FAToken(secret, token) {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1, // Accept 30s before/after
  });
}

module.exports = {
  generate2FASecret,
  verify2FAToken,
};
