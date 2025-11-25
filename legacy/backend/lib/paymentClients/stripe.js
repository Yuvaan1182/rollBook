const Stripe = require("stripe");
const { configs } = require("../../src/config/constants/paymentGateways");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createStripePayment({ amount, currency, metadata }) {
  return await stripe.paymentLinks.create({
    line_items: [{ price_data: { currency, product_data: { name: "Invoice" }, unit_amount: amount }, quantity: 1 }],
    metadata,
  });
}

async function verifyStripeWebhook(req) {
  const signature = req.headers["stripe-signature"];
  return stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
}

module.exports = { createStripePayment, verifyStripeWebhook };
