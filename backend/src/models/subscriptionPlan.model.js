const mongoose = require('mongoose');

const SubscriptionPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['free', 'pro'], required: true },
  expiresAt: Date,
  billingProvider: { type: String, trim: true, maxlength: 50 },
  customerId: { type: String, trim: true, maxlength: 100 },
  status: { type: String, enum: ['active', 'cancelled'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
