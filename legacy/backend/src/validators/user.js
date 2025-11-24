const { z } = require('zod');

const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128).optional(),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/).optional(),
  isEmailVerified: z.boolean().optional(),
  isPhoneVerified: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorMethod: z.enum(['email', 'sms', 'auth_app']).optional(),
  twoFactorSecret: z.string().min(16).max(64).optional(),
  socials: z.array(z.object({
    platform: z.enum(['linkedin', 'github']),
    url: z.string().url(),
    isPublic: z.boolean().optional(),
    addedAt: z.date().optional()
  })).optional(),
  timezone: z.string().max(50).optional(),
  locale: z.string().max(10).optional(),
  industry: z.string().max(100).optional(),
  services: z.array(z.string().max(100)).optional(),
  hasLinkedPaymentDetails: z.boolean().optional(),
  calendarIntegration: z.boolean().optional(),
  role: z.enum(['freelancer', 'admin']).optional(),
});

module.exports = { userSchema };
