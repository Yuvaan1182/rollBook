const { z } = require('zod');

const cronSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  isActive: z.boolean().optional(),
  lastRunAt: z.date().optional(),
  createdAt: z.date().optional(),
});

module.exports = { cronSchema };
