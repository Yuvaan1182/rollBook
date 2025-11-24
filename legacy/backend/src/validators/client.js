const { z } = require('zod');

const clientSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/).optional(),
  company: z.string().max(100).optional(),
  address: z.string().max(200).optional(),
  preferredCurrency: z.string().max(10).optional(),
  timezone: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(['active', 'lead', 'inactive', 'defaulter']).optional(),
  totalBilled: z.number().min(0).max(100000000).optional(),
  lastInvoicedAt: z.date().optional(),
  feedbackFromClient: z.string().max(500).optional(),
  feedbackForClient: z.string().max(500).optional(),
  proposalStats: z.object({
    totalSent: z.number().min(0).max(10000).optional(),
    emailSentPerProposal: z.number().min(0).max(1000).optional()
  }).optional(),
  invoiceStats: z.object({
    totalSent: z.number().min(0).max(10000).optional(),
    paidCount: z.number().min(0).max(10000).optional(),
    unpaidCount: z.number().min(0).max(10000).optional(),
    overdueCount: z.number().min(0).max(10000).optional(),
    emailSentPerInvoice: z.number().min(0).max(1000).optional()
  }).optional(),
});

module.exports = { clientSchema };
