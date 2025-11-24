require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const env = require("../src/config/env.config");
const port = 3002;
const nodeEnv = env.nodeEnv || "development";
const stripe = new Stripe(env.payments.stripe.secretKey);
const stripeKey = env.payments.stripe.secretKey;
console.log(env.payments.stripe.secretKey ? "Stripe key loaded successfully" : "Stripe key not found in environment variables", stripeKey);

const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log(`🧭 Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

app.post("/subscribe", express.json(), async (req, res) => {
  try {
    console.log("Subscribe endpoint called", req.body);
    const { priceId, email, userId } = req.body;
    if (!priceId || !email || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create or retrieve Stripe customer
    const customer = await stripe.customers.create({
      email,
      metadata: { userId },
    });

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${env.react.url}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.react.url}/subscription/cancel`,
    });

    return res.json({
      success: true,
      message: "Subscribed to plan successfully",
      url: stripeSession.url,
      sessionId: stripeSession.id,
      subscriptionId: stripeSession.subscription,
    });
  } catch (error) {
    console.error("Error subscribing to plan:", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      error: error.message,
    });
  }
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).send("Webhook received");
});

app.listen(port, () => {
  console.log(
    `🚀 Server running in ${nodeEnv} on route ✅ http://localhost:${port}`
  );
});
