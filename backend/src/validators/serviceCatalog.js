const { z } = require('zod');

const serviceCatalogSchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  rate: z.number().min(0).max(1000000),
});

module.exports = { serviceCatalogSchema };
