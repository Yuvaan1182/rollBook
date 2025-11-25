const { z } = require('zod');

const proposalServiceSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  rate: z.number().min(0).max(1000000)
});

const emailLogSchema = z.object({
  sentAt: z.date().optional(),
  subject: z.string().max(200).optional(),
  contentPreview: z.string().max(500).optional()
});

const proposalSchema = z.object({
  userId: z.string().optional(),
  clientId: z.string().optional(),
  relatedProjectId: z.string().optional(),
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  services: z.array(proposalServiceSchema),
  totalAmount: z.number().min(0).max(100000000),
  status: z.enum(['sent', 'accepted', 'rejected', 'pending']).optional(),
  sentAt: z.date().optional(),
  acceptedAt: z.date().optional(),
  declinedAt: z.date().optional(),
  feedbackFromClient: z.string().max(500).optional(),
  feedbackFromFreelancer: z.string().max(500).optional(),
  emailLogs: z.array(emailLogSchema).optional(),
});

module.exports = { proposalSchema };
