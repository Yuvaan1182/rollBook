class ClientService {
  constructor(ClientModel) {
    this.Client = ClientModel;

    // Auto-bind all methods to preserve 'this'
    Object.getOwnPropertyNames(ClientService.prototype)
      .filter((fn) => fn !== "constructor")
      .forEach((fn) => (this[fn] = this[fn].bind(this)));
  }

  async createClient(data) {
    return this.Client.create(data);
  }

  async getClientById(id) {
    return this.Client.findById(id);
  }

  async updateClient(id, data) {
    return this.Client.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteClient(id) {
    return this.Client.findByIdAndDelete(id);
  }

  async getClients(filter = {}) {
    return this.Client.find(filter);
  }

  async deleteClients(filter) {
    return this.Client.deleteMany({
      $or: [...filter],
    });
  }

  async filteredClient(filter) {
    return this.Client.findOne({
      $or: [...filter],
    });
  }
}

module.exports = ClientService;
