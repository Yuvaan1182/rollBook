const { z, email } = require("zod");

const createClientSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, "Invalid phone number format")
    .optional(),
  address: z.string().max(200).optional(),
  company: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
  country: z.string().max(100).optional(),
  countryCode: z.string().max(10).optional(),
  preferredCurrency: z.string().max(10).optional(),
  timezone: z.string().max(50).optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(["active", "lead", "inactive", "defaulter"]).optional(),
});

const getClientsSchema = z.object({
  status: z.enum(["active", "lead", "inactive", "defaulter"]).optional(),
  country: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).optional(),
  preferredCurrency: z.string().max(10).optional(),
});

const getClientSchema = z.object({
  id: z.string().optional(),
  email: z.email().optional(),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, "Invalid phone number format")
    .optional(),
});

const updateClientSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.email().optional(),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, "Invalid phone number format")
    .optional(),
  address: z.string().max(200).optional(),
  company: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
  country: z.string().max(100).optional(),
  countryCode: z.string().max(10).optional(),
  preferredCurrency: z.string().max(10).optional(),
  timezone: z.string().max(50).optional(),
  tags: z.array(z.string().max(50)).optional(),
  status: z.enum(["active", "lead", "inactive", "defaulter"]).optional(),
});

const deleteClientsSchema = z.object({
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, "Invalid phone number format")
    .optional(),
  country: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  status: z.enum(["active", "lead", "inactive", "defaulter"]).optional(),
});

// Combine all schemas into a single object for easy export
const clientSchema = {
  createClient: createClientSchema,
  getClients: getClientsSchema,
  getClient: getClientSchema,
  updateClient: updateClientSchema,
  deleteClients: deleteClientsSchema,
};

// Export all schemas in a modular way
module.exports = clientSchema;
