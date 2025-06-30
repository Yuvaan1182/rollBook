const { z } = require('zod');

const invoiceItemSchema = z.object({
  description: z.string().max(200),
  quantity: z.number().min(1).max(10000),
  rate: z.number().min(0).max(1000000),
  total: z.number().min(0).max(100000000)
});

const paymentStatusHistorySchema = z.object({
  status: z.string().max(50),
  changedAt: z.date().optional()
});

const invoiceSchema = z.object({
  userId: z.string().optional(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
  invoiceNumber: z.string().max(50),
  invoiceDate: z.date().optional(),
  dueDate: z.date().optional(),
  currency: z.string().max(10),
  items: z.array(invoiceItemSchema),
  subtotal: z.number().min(0).max(100000000),
  tax: z.number().min(0).max(10000000).optional(),
  discount: z.number().min(0).max(10000000).optional(),
  totalAmount: z.number().min(0).max(100000000),
  notes: z.string().max(1000).optional(),
  status: z.enum(['paid', 'unpaid', 'overdue', 'cancelled']).optional(),
  paymentMethod: z.string().max(50).optional(),
  paidAt: z.date().optional(),
  paymentLink: z.string().url().max(200).optional(),
  receiptUrl: z.string().url().max(200).optional(),
  reminderCount: z.number().min(0).max(100).optional(),
  paymentStatusHistory: z.array(paymentStatusHistorySchema).optional(),
  pdfUrl: z.string().url().max(200).optional(),
});

module.exports = { invoiceSchema };
