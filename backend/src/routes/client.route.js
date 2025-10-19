const express = require("express");
const router = express.Router();
const { createAuthMiddleware } = require("../middlewares/auth/auth.middleware");
const { validate } = require("../middlewares/zod/inputValidator.middleware");
const env = require("../config/env.config");

/** @Auth Middleware */
router.use(createAuthMiddleware({ secret: env.jwt.secret }));

/** @Routes */
// router.post("/client", validate(), addClient);
// router.get("/clients", validate(), getClients);
// router.get("/client/:id", validate(), getClientById);
// router.put("/client/:id", validate(), updateClient);
// router.delete("/client/:id", validate(), deleteClient);

module.exports = router;
