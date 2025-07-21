const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, trim: true, lowercase: true, match: /.+\@.+\..+/ },
  phone: { type: String, match: /^\+?[0-9]{7,15}$/ },
  company: { type: String, trim: true, maxlength: 100 },
  address: { type: String, trim: true, maxlength: 200 },
  preferredCurrency: { type: String, trim: true, maxlength: 10 },
  timezone: { type: String, trim: true, maxlength: 50 },
  notes: { type: String, trim: true, maxlength: 500 },
  tags: [{ type: String, trim: true, maxlength: 50 }],
  status: {
    type: String,
    enum: ["active", "lead", "inactive", "defaulter"],
    default: "active",
  },
  totalBilled: { type: Number, min: 0, max: 100000000 },
  lastInvoicedAt: Date,
  feedbackFromClient: { type: String, trim: true, maxlength: 500 },
  feedbackForClient: { type: String, trim: true, maxlength: 500 },
  proposalStats: {
    totalSent: { type: Number, min: 0, max: 10000, default: 0 },
    emailSentPerProposal: { type: Number, min: 0, max: 1000, default: 0 },
  },
  invoiceStats: {
    totalSent: { type: Number, min: 0, max: 10000, default: 0 },
    paidCount: { type: Number, min: 0, max: 10000, default: 0 },
    unpaidCount: { type: Number, min: 0, max: 10000, default: 0 },
    overdueCount: { type: Number, min: 0, max: 10000, default: 0 },
    emailSentPerInvoice: { type: Number, min: 0, max: 1000, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", ClientSchema);
