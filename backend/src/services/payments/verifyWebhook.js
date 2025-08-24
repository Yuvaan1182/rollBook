// /src/services/payments/verifyWebhook.js
const stripe = require("../../lib/paymentClients/stripe");
const razorpay = require("../../lib/paymentClients/razorpay");

async function verifyPayment(provider, req) {
  if (provider === "stripe") {
    try {
      const event = stripe.verifyStripeWebhook(req);
      return { valid: true, event };
    } catch (err) {
      console.error("❌ Stripe webhook verification failed:", err.message);
      return { valid: false, error: err };
    }
  }

  if (provider === "razorpay") {
    const signature = req.headers["x-razorpay-signature"];
    const payload = JSON.stringify(req.body);

    const isValid = await razorpay.verifyRazorpaySignature({ payload, signature });
    if (!isValid) {
      return { valid: false, error: new Error("Invalid Razorpay Signature") };
    }

    return { valid: true, event: req.body };
  }

  return { valid: false, error: new Error("Unsupported provider") };
}

module.exports = { verifyPayment };
