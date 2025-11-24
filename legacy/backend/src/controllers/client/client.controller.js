class ClientController {
  constructor(clientService) {
    this.service = clientService;

    // Auto-bind all methods to preserve 'this'
    Object.getOwnPropertyNames(ClientController.prototype)
      .filter((fn) => fn !== "constructor")
      .forEach((fn) => (this[fn] = this[fn].bind(this)));
  }

  async createClient(req, res, next) {
    try {
      const client = await this.service.createClient(req.body);
      res.status(201).json(client);
    } catch (err) {
      next(err);
    }
  }

  async getClient(req, res, next) {
    try {
      const client = await this.service.getClient(req.params.id);
      if (!client) return res.status(404).json({ message: "Client not found" });
      res.json(client);
    } catch (err) {
      next(err);
    }
  }

  async updateClient(req, res, next) {
    try {
      const client = await this.service.updateClient(req.params.id, req.body);
      if (!client) return res.status(404).json({ message: "Client not found" });
      res.json(client);
    } catch (err) {
      next(err);
    }
  }

  async deleteClient(req, res, next) {
    try {
      const client = await this.service.deleteClient(req.params.id);
      if (!client) return res.status(404).json({ message: "Client not found" });
      res.json({ message: "Client deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getClients(req, res, next) {
    try {
      const filter = req.query || {};
      const clients = await this.service.getClients(filter);
      res.json(clients);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClientController;
