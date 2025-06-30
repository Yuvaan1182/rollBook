const mongoose = require('mongoose');

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, trim: true, maxlength: 200 },
  quantity: { type: Number, min: 1, max: 10000 },
  rate: { type: Number, min: 0, max: 1000000 },
  total: { type: Number, min: 0, max: 100000000 }
}, { _id: false });

const PaymentStatusHistorySchema = new mongoose.Schema({
  status: { type: String, trim: true, maxlength: 50 },
  changedAt: Date
}, { _id: false });

const InvoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  invoiceNumber: { type: String, trim: true, maxlength: 50 },
  invoiceDate: Date,
  dueDate: Date,
  currency: { type: String, trim: true, maxlength: 10 },
  items: [InvoiceItemSchema],
  subtotal: { type: Number, min: 0, max: 100000000 },
  tax: { type: Number, min: 0, max: 10000000 },
  discount: { type: Number, min: 0, max: 10000000 },
  totalAmount: { type: Number, min: 0, max: 100000000 },
  notes: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['paid', 'unpaid', 'overdue', 'cancelled'], default: 'unpaid' },
  paymentMethod: { type: String, trim: true, maxlength: 50 },
  paidAt: Date,
  paymentLink: { type: String, trim: true, maxlength: 200 },
  receiptUrl: { type: String, trim: true, maxlength: 200 },
  reminderCount: { type: Number, min: 0, max: 100 },
  paymentStatusHistory: [PaymentStatusHistorySchema],
  pdfUrl: { type: String, trim: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
