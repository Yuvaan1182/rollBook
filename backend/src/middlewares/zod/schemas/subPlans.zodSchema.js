const { z, email } = require("zod");

const zodSubSchemas = {
  createPlanSchema: z.object({
    name: z
      .string()
      .min(1, "Plan name is required")
      .max(100, "Plan name cannot exceed 100 characters"),
    slug: z
      .string()
      .min(1, "Plan slug is required")
      .max(50, "Plan slug cannot exceed 50 characters"),
    price: z.number().min(0, "Price must be a positive number"),
    interval: z.enum(
      ["month", "year"],
      "Interval must be either 'month' or 'year'"
    ),
    trialDays: z.number().min(0, "Trial days cannot be negative"),
    isCustom: z.boolean(),
    maxTeamMembers: z.number().min(1, "Max team members must be at least 1"),
    supportLevel: z.enum(
      ["email", "chat", "priority"],
      "Support level must be one of 'email', 'chat', or 'priority'"
    ),
    limits: z.object({
      maxTokensPerMonth: z
        .number()
        .min(0, "Max tokens per month must be a positive number"),
      maxProposalsPerMonth: z
        .number()
        .min(0, "Max proposals per month must be a positive number"),
      maxInvoicesPerMonth: z
        .number()
        .min(0, "Max invoices per month must be a positive number"),
    }),
    stripeMonthlyPriceId: z.string().optional(),
    stripeProductId: z.string().optional(),
    priceMonthly: z
      .number()
      .min(0, "Monthly price must be a positive number")
      .optional(),
  }),
  updatePlanSchema: z.object({
    id: z.string().min(1, "Plan ID is required"),
    name: z
      .string()
      .min(1, "Plan name is required")
      .max(100, "Plan name cannot exceed 100 characters"),
    slug: z
      .string()
      .min(1, "Plan slug is required")
      .max(50, "Plan slug cannot exceed 50 characters"),
    price: z.number().min(0, "Price must be a positive number"),
    interval: z.enum(
      ["month", "year"],
      "Interval must be either 'month' or 'year'"
    ),
    trialDays: z.number().min(0, "Trial days cannot be negative"),
    isCustom: z.boolean(),
    maxTeamMembers: z.number().min(1, "Max team members must be at least 1"),
    supportLevel: z.enum(
      ["email", "chat", "priority"],
      "Support level must be one of 'email', 'chat', or 'priority'"
    ),
    limits: z.object({
      maxTokensPerMonth: z
        .number()
        .min(0, "Max tokens per month must be a positive number"),
      maxProposalsPerMonth: z
        .number()
        .min(0, "Max proposals per month must be a positive number"),
      maxInvoicesPerMonth: z
        .number()
        .min(0, "Max invoices per month must be a positive number"),
    }),
    stripeMonthlyPriceId: z.string().optional(),
    stripeProductId: z.string().optional(),
    priceMonthly: z
      .number()
      .min(0, "Monthly price must be a positive number")
      .optional(),
  }),
  subscribeUserSchema: z.object({
    planId: z.string().min(1, "Plan ID is required"),
    email: z.email().min(1, "Email is required"),
  }),
};

module.exports = zodSubSchemas;
