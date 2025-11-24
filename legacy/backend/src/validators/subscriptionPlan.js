const { z } = require('zod');

const subscriptionPlanSchema = z.object({
  userId: z.string().optional(),
  plan: z.enum(['free', 'pro']),
  expiresAt: z.date().optional(),
  billingProvider: z.string().max(50).optional(),
  customerId: z.string().max(100).optional(),
  status: z.enum(['active', 'cancelled']),
});

module.exports = { subscriptionPlanSchema };
