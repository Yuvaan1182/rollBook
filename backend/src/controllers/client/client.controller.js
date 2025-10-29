const { cleanClientObject } = require("../../utils/client/clientUtil");
const {
  errorResponse,
  successResponse,
} = require("../../utils/response.utils");

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
      const { email, phone, ...rest } = req.body;

      // check if client already exists with same email or phone
      const existingClient = await this.service.filteredClient([
        { email },
        { phone },
      ]);

      if (existingClient) {
        return errorResponse(
          res,
          "Client with the same email or phone already exists",
          { message: "DUPLICATE_CLIENT" },
          400
        );
      }

      req.body.userId = req.user.id; // Associate client with authenticated user
      let client = await this.service.createClient(req.body);

      return successResponse(
        res,
        "Client created successfully",
        { client },
        201
      );
    } catch (err) {
      next(err);
    }
  }

  async getClientById(req, res, next) {
    try {
      const client = await this.service.getClientById(req.params.id);
      if (!client)
        return errorResponse(
          res,
          "Client not found",
          { message: "NOT_FOUND" },
          404
        );
      return successResponse(
        res,
        "Client fetched successfully",
        { client },
        200
      );
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

  async deleteClients(req, res, next) {
    try {
      /**
       * @Example
       * Build filter array from request body
       * Example: { "email": "john@example.com", "phone": "1234567890" }
       * Becomes: [ { email: "john@example.com"}, { phone: "1234567890" } ]
       */
      let filter = new Array();
      if (req.body) {
        Object.keys(req.body).forEach((key) => {
          let obj = {};
          obj[key] = req.body[key];
          filter.push(obj);
        });
      }
      // console.log("Delete clients with filter:", filter); // Debugging log

      const result = await this.service.deleteClients(filter);
      return successResponse(res, "All clients deleted successfully", {
        deletedCount: result.deletedCount,
      });
    } catch (err) {
      next(err);
    }
  }

  async getClients(req, res, next) {
    try {
      const filter = req.query || {};
      const clients = await this.service.getClients(filter);
      return successResponse(
        res,
        "Clients fetched successfully",
        { clients },
        200
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClientController;
