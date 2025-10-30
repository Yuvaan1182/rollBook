const env = require("../config/env.config");

const express = require("express");
const router = express.Router();

const { createAuthMiddleware } = require("../middlewares/auth/auth.middleware");
const clientSchema = require("../middlewares/zod/schemas/client.schema");
const { validate } = require("../middlewares/zod/inputValidator.middleware");

const Client = require("../models/client.model");
const ClientService = require("../services/client/client.service");
const ClientController = require("../controllers/client/client.controller");

const clientService = new ClientService(Client);
const clientController = new ClientController(clientService);

/** @Auth Middleware */
router.use(createAuthMiddleware({ secret: env.jwt.secret }));

/** @Routes */

/** @route get all clients */
router.get(
  "/user/clients",
  validate(clientSchema.getClients, "body"),
  clientController.getClients
);

/** @route delete multiple clients */
router.delete(
  "/user/clients",
  validate(clientSchema.deleteClients),
  clientController.deleteClients
);

router.post(
  "/client",
  validate(clientSchema.createClient, "body"),
  clientController.createClient
);

router.get("/client/:id", clientController.getClientById);

router.put(
  "/client/:id",
  validate(clientSchema.updateClient, "body"),
  clientController.updateClient
);

router.delete("/client/:id", clientController.deleteClient);

module.exports = router;
