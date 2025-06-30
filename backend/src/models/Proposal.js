const mongoose = require('mongoose');

const ProposalServiceSchema = new mongoose.Schema({
  name: { type: String, trim: true, minlength: 2, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 500 },
  rate: { type: Number, min: 0, max: 1000000 }
}, { _id: false });

const EmailLogSchema = new mongoose.Schema({
  sentAt: Date,
  subject: { type: String, trim: true, maxlength: 200 },
  contentPreview: { type: String, trim: true, maxlength: 500 }
}, { _id: false });

const ProposalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  relatedProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title: { type: String, trim: true, minlength: 2, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 1000 },
  services: [ProposalServiceSchema],
  totalAmount: { type: Number, min: 0, max: 100000000 },
  status: { type: String, enum: ['sent', 'accepted', 'rejected', 'pending'], default: 'pending' },
  sentAt: Date,
  acceptedAt: Date,
  declinedAt: Date,
  feedbackFromClient: { type: String, trim: true, maxlength: 500 },
  feedbackFromFreelancer: { type: String, trim: true, maxlength: 500 },
  emailLogs: [EmailLogSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', ProposalSchema);
