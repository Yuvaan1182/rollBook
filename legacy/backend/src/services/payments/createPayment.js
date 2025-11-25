const stripe = require("../../config/payments/stripe");
const razorpay = require("../../config/payments/razorpay");
const { gateways } = require("../../config/constants/paymentGateways");

const clients = {
  stripe: async ({ amount, currency, metadata }) => {
    return await stripe.paymentLinks.create({
      line_items: [{
        price_data: {
          currency,
          product_data: { name: "Invoice" },
          unit_amount: amount
        },
        quantity: 1
      }],
      metadata
    });
  },

  razorpay: async ({ amount, currency, metadata }) => {
    return await razorpay.paymentLink.create({
      amount,
      currency,
      notes: metadata,
      callback_url: process.env.FRONTEND_CALLBACK_URL,
      callback_method: "get"
    });
  }
};

async function createPaymentWithFallback(payload) {
  for (const gateway of gateways) {
    try {
      const result = await clients[gateway](payload);
      return { provider: gateway, ...result };
    } catch (err) {
      console.warn(`⚠️ ${gateway} failed: ${err.message}`);
    }
  }
  throw new Error("All payment gateways failed");
}

module.exports = { createPaymentWithFallback };
