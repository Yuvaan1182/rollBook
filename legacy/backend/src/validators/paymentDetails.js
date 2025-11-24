const { z } = require('zod');

const paymentDetailsSchema = z.object({
  userId: z.string().optional(),
  upiId: z.string().min(5).max(50).optional(),
  bankAccount: z.object({
    accountHolder: z.string().min(2).max(100).optional(),
    accountNumber: z.string().min(6).max(32).optional(),
    ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/).optional(),
    bankName: z.string().min(2).max(100).optional(),
  }).optional(),
  cardReceiverLink: z.string().url().max(200).optional(),
});

module.exports = { paymentDetailsSchema };
