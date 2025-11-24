// Compatibility wrapper: re-export methods from the new class-based controller
const InvoiceModel = require("../models/invoice.model");
const InvoiceService = require("../services/invoice/invoice.service");
const InvoiceControllerClass = require("./invoice/invoice.controller");

const invoiceService = new InvoiceService(InvoiceModel);
const invoiceController = new InvoiceControllerClass(invoiceService);

// Export functions with the old names to remain backwards compatible
exports.getAllInvoices = invoiceController.getInvoices.bind(invoiceController);
exports.getInvoiceById = invoiceController.getInvoice.bind(invoiceController);
exports.createInvoice = invoiceController.createInvoice.bind(invoiceController);
exports.updateInvoice = invoiceController.updateInvoice.bind(invoiceController);
exports.deleteInvoice = invoiceController.deleteInvoice.bind(invoiceController);
