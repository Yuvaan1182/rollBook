const Stripe = require("stripe");
const env = require("./env.config");

let stripeInstance;

// Only initialize if key exists
if (env?.payments?.stripe?.secretKey) {
  stripeInstance = new Stripe(env.payments.stripe.secretKey);
} else {
  // In tests (no key), return a dummy placeholder
  stripeInstance = { paymentIntents: { create: async () => ({}) } };
}

module.exports = stripeInstance;
