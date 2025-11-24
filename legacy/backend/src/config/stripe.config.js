const Stripe = require("stripe");
const env = require("./env.config");

const stripe = new Stripe(env.payments.stripe.secretKey);

module.exports = stripe;
