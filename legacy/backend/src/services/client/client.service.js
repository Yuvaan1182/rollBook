class ClientService {
  constructor(ClientModel) {
    this.Client = ClientModel;
  }

  async createClient(data) {
    return this.Client.create(data);
  }

  async getClient(id) {
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
}

module.exports = ClientService;
