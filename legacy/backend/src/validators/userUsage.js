const { z } = require('zod');

const userUsageSchema = z.object({
  userId: z.string().optional(),
  invoiceCount: z.number().min(0).max(10000).optional(),
  clientCount: z.number().min(0).max(10000).optional(),
  proposalCount: z.number().min(0).max(10000).optional(),
  emailSentCount: z.number().min(0).max(100000).optional(),
  invoiceEmailsThisWeek: z.number().min(0).max(10000).optional(),
  proposalEmailsThisWeek: z.number().min(0).max(10000).optional(),
  usageResetAt: z.date().optional(),
});

module.exports = { userUsageSchema };
