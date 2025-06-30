const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  name: { type: String, trim: true, minlength: 2, maxlength: 100 },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  calendarEventId: { type: String, trim: true, maxlength: 100 }
}, { _id: true });

const ChangeRequestSchema = new mongoose.Schema({
  title: { type: String, trim: true, minlength: 2, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 500 },
  dateRequested: Date,
  approved: { type: Boolean, default: false },
  notes: { type: String, trim: true, maxlength: 500 }
}, { _id: true });

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  proposalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' },
  title: { type: String, trim: true, minlength: 2, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 1000 },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'on_hold', 'cancelled'],
    default: 'in_progress'
  },
  milestones: [MilestoneSchema],
  changeRequests: [ChangeRequestSchema],
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
