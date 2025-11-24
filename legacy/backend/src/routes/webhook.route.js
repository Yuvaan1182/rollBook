const express = require('express');
const router = express.Router();

const webhookController = require('../controllers/webhook/webhook.controller');

router.post(
  "/stripe",
  webhookController.stripeWebhookHandler
);

module.exports = router; 