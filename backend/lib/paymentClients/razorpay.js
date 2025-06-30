const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function createRazorpayPayment({ amount, currency, metadata }) {
  return await instance.paymentLink.create({
    amount,
    currency,
    notes: metadata,
    callback_url: process.env.FRONTEND_CALLBACK_URL,
    callback_method: "get"
  });
}

async function verifyRazorpaySignature({ payload, signature }) {
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;
}

module.exports = { createRazorpayPayment, verifyRazorpaySignature };
