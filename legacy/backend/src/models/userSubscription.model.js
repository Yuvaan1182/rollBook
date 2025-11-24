const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  tokensUsed: { type: Number, default: 0 },
  proposalsUsed: { type: Number, default: 0 },
  invoicesGenerated: { type: Number, default: 0 },
}, { _id: false });

const userSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // unique: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubscriptionPlan",
    required: true,
  },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },

  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },

  currentPeriodStart: { type: Date },
  currentPeriodEnd: { type: Date },

  trialEndsAt: { type: Date },
  isTrialing: { type: Boolean, default: false },

  isCancelled: { type: Boolean, default: false },
  cancelAtPeriodEnd: { type: Boolean, default: false },

  status: {
    type: String,
    enum: ["active", "inactive", "trialing", "canceled", "past_due", "pending"],
    default: "trialing",
  },

  usage: usageSchema,
}, {
  timestamps: true,
});

userSubscriptionSchema.index({ userId: 1 }); // For faster lookups
module.exports = mongoose.model("UserSubscription", userSubscriptionSchema);
