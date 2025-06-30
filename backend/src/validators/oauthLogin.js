const { z } = require('zod');

const oauthLoginSchema = z.object({
  userId: z.string().optional(),
  provider: z.string().max(30),
  providerId: z.string().max(100),
  email: z.string().email().optional(),
});

module.exports = { oauthLoginSchema };
