const { z } = require('zod');

const emailLogSchema = z.object({
  userId: z.string().optional(),
  clientId: z.string().optional(),
  referenceType: z.string().max(50).optional(),
  referenceId: z.string().optional(),
  subject: z.string().max(200).optional(),
  bodyPreview: z.string().max(500).optional(),
  sentAt: z.date().optional(),
  deliveryStatus: z.string().max(50).optional(),
});

module.exports = { emailLogSchema };
