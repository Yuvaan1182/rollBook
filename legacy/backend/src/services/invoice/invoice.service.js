class InvoiceService {
  constructor(InvoiceModel) {
    this.Invoice = InvoiceModel;
  }

  async createInvoice(data) {
    return this.Invoice.create(data);
  }

  async getInvoice(id) {
    return this.Invoice.findById(id);
  }

  async updateInvoice(id, data) {
    return this.Invoice.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteInvoice(id) {
    return this.Invoice.findByIdAndDelete(id);
  }

  async getInvoices(filter = {}) {
    return this.Invoice.find(filter);
  }
}

module.exports = InvoiceService;
