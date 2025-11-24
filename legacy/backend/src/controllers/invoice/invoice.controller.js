class InvoiceController {
  constructor(invoiceService) {
    this.service = invoiceService;

    // Auto-bind all methods to preserve 'this'
    Object.getOwnPropertyNames(InvoiceController.prototype)
      .filter((fn) => fn !== "constructor")
      .forEach((fn) => (this[fn] = this[fn].bind(this)));
  }

  async createInvoice(req, res, next) {
    try {
      const invoice = await this.service.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (err) {
      next(err);
    }
  }

  async getInvoice(req, res, next) {
    try {
      const invoice = await this.service.getInvoice(req.params.id);
      if (!invoice)
        return res.status(404).json({ message: "Invoice not found" });
      res.json(invoice);
    } catch (err) {
      next(err);
    }
  }

  async updateInvoice(req, res, next) {
    try {
      const invoice = await this.service.updateInvoice(req.params.id, req.body);
      if (!invoice)
        return res.status(404).json({ message: "Invoice not found" });
      res.json(invoice);
    } catch (err) {
      next(err);
    }
  }

  async deleteInvoice(req, res, next) {
    try {
      const invoice = await this.service.deleteInvoice(req.params.id);
      if (!invoice)
        return res.status(404).json({ message: "Invoice not found" });
      res.json({ message: "Invoice deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getInvoices(req, res, next) {
    try {
      const filter = req.query || {};
      const invoices = await this.service.getInvoices(filter);
      res.json(invoices);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = InvoiceController;
