const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subsription/subs.controller");
const { createAuthMiddleware } = require("../middlewares/auth/auth.middleware");
const { validate } = require("../middlewares/zod/inputValidator.middleware");
const zodSubPlanSchemas = require("../middlewares/zod/schemas/subPlans.zodSchema");
const env = require("../config/env.config");

/** @Public routes */
router.get("/public/plans", subscriptionController.getSubPlans);

/** @Auth Middleware */
router.use(
  createAuthMiddleware({ secret: env.jwt.secret }),
);

/** @Admin routes */
router.post(
  "/admin/plans",
  validate(zodSubPlanSchemas.createPlanSchema, "body"),
  subscriptionController.createSubPlan
);
router.put(
  "/admin/plans/:id",
  validate(zodSubPlanSchemas.updatePlanSchema, "body"),
  subscriptionController.updateSubPlan
);
router.delete(
  "/admin/plans/:id",
  subscriptionController.deleteSubPlan
);

/** @User routes */
router.get(
  "/user/subscription",
  subscriptionController.getMySubPlan
);
router.post(
  "/user/subscribe",
  validate(zodSubPlanSchemas.subscribeUserSchema, "body"),
  subscriptionController.subscribePlan
);
router.get(
  "/user/stripe/customer-portal/:customerId",
  subscriptionController.getCustomerPortal
);

module.exports = router;
