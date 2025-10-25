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
router.post(
  "/client",
  validate(clientSchema.createClient, "body"),
  clientController.createClient
);

router.get(
  "/clients",
  validate(clientSchema.getClients, "body"),
  clientController.getClients
);

router.put(
  "/client/:id",
  validate(clientSchema.updateClient, "body"),
  clientController.updateClient
);

router.get("/client/:id", clientController.getClient);

router.delete("/client/:id", clientController.deleteClient);

module.exports = router;
