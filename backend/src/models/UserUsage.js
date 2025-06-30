const mongoose = require('mongoose');

const UserUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceCount: { type: Number, min: 0, max: 10000, default: 0 },
  clientCount: { type: Number, min: 0, max: 10000, default: 0 },
  proposalCount: { type: Number, min: 0, max: 10000, default: 0 },
  emailSentCount: { type: Number, min: 0, max: 100000, default: 0 },
  invoiceEmailsThisWeek: { type: Number, min: 0, max: 10000, default: 0 },
  proposalEmailsThisWeek: { type: Number, min: 0, max: 10000, default: 0 },
  usageResetAt: Date
});

module.exports = mongoose.model('UserUsage', UserUsageSchema);
