const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g., "Pro Monthly"
    },
    slug: {
      type: String,
      required: true,
      unique: true, // e.g., "pro_monthly"
    },
    description: {
      type: String,
      default: "",
    },
    priceMonthly: {
      type: Number,
      required: true,
    },
    priceYearly: {
      type: Number,
      default: null,
    },
    tokenLimit: {
      type: Number,
      default: 50000, // LLM token usage per month
    },
    proposalLimit: {
      type: Number,
      default: 10, // No. of proposals per month
    },
    rateLimit: {
      type: Number,
      default: 60, // Requests per minute
    },
    features: {
      type: [String],
      default: [],
    },
    trialDays: {
      type: Number,
      default: 0, // Days of free trial
    },
    isCustom: {
      type: Boolean,
      default: false, // For enterprise or special plans
    },
    maxTeamMembers: {
      type: Number,
      default: 1, // Team/multi-user access
    },
    supportLevel: {
      type: String,
      enum: ["email", "chat", "priority"],
      default: "email",
    },
    stripeProductId: {
      type: String,
      required: true,
    },
    stripeMonthlyPriceId: {
      type: String,
      required: true,
    },
    stripeYearlyPriceId: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
