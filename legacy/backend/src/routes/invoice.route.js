const express = require("express");
const router = express.Router();
const { createAuthMiddleware } = require("../middlewares/auth/auth.middleware");
const { validate } = require("../middlewares/zod/inputValidator.middleware");
const env = require("../config/env.config");

const InvoiceModel = require("../models/invoice.model");
const InvoiceService = require("../services/invoice/invoice.service");
const InvoiceController = require("../controllers/invoice/invoice.controller");
const { invoiceSchema } = require("../validators/invoice");

const invoiceService = new InvoiceService(InvoiceModel);
const invoiceController = new InvoiceController(invoiceService);

/** @Auth Middleware */
router.use(createAuthMiddleware({ secret: env.jwt.secret }));

/** @Routes */
router.post(
  "/invoice",
  validate(invoiceSchema),
  invoiceController.createInvoice
);
router.get("/invoices", invoiceController.getInvoices);
router.get("/invoice/:id", invoiceController.getInvoice);
router.put(
  "/invoice/:id",
  validate(invoiceSchema),
  invoiceController.updateInvoice
);
router.delete("/invoice/:id", invoiceController.deleteInvoice);

module.exports = router;
