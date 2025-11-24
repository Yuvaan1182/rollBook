const { z } = require('zod');

const milestoneSchema = z.object({
  name: z.string().min(2).max(100),
  dueDate: z.date().optional(),
  completed: z.boolean().optional(),
  calendarEventId: z.string().max(100).optional()
});

const changeRequestSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  dateRequested: z.date().optional(),
  approved: z.boolean().optional(),
  notes: z.string().max(500).optional()
});

const projectSchema = z.object({
  userId: z.string().optional(),
  clientId: z.string().optional(),
  proposalId: z.string().optional(),
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  status: z.enum(['in_progress', 'completed', 'on_hold', 'cancelled']).optional(),
  milestones: z.array(milestoneSchema).optional(),
  changeRequests: z.array(changeRequestSchema).optional(),
  invoices: z.array(z.string()).optional(),
});

module.exports = { projectSchema };
