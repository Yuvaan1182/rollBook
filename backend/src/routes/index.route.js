const express = require("express");
const router = express.Router();

router.use(
  "/webhook",
  express.raw({ type: "application/json" }),
  require("./webhook.route")
);
router.use(express.json());
router.use("/auth", require("./auth.route"));
router.use("/subs", require("./subs.route"));
router.use("/invoices", require("./invoice.route"));
router.use("/clients", require("./client.route"));

module.exports = router;
