const mongoose = require('mongoose');

const EmailLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  referenceType: { type: String, trim: true, maxlength: 50 },
  referenceId: mongoose.Schema.Types.ObjectId,
  subject: { type: String, trim: true, maxlength: 200 },
  bodyPreview: { type: String, trim: true, maxlength: 500 },
  sentAt: Date,
  deliveryStatus: { type: String, trim: true, maxlength: 50 }
});

module.exports = mongoose.model('EmailLog', EmailLogSchema);
