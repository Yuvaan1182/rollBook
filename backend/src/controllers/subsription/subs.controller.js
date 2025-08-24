// backend/src/controllers/subscription/subs.controller.js
// import node modules
const stripe = require("../../config/stripe.config");

// import models
const SubscriptionPlan = require("../../models/subscriptionPlan.model");
// Load environment variables
const env = require("../../config/env.config");

// import services
const redis = require("../../config/redis.config");
// import utils
const {
  successResponse,
  errorResponse,
} = require("../../utils/response.utils");
const userSubscriptionModel = require("../../models/userSubscription.model");
const { subscribe } = require("../../routes/auth.route");

const subsController = {
  /** @Public Access */
  getSubPlans: async (req, res) => {
    try {
      const plans = await SubscriptionPlan.find({ active: true });
      return successResponse(res, "Subscription plans fetched successfully", {
        plans,
      });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      return errorResponse(
        res,
        "Failed to fetch subscription plans",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },
  /** @Admin Access */
  createSubPlan: async (req, res) => {
    try {
      const {
        name,
        slug,
        price,
        interval,
        trialDays,
        isCustom,
        maxTeamMembers,
        supportLevel,
        limits,
        stripeMonthlyPriceId,
        stripeProductId,
        priceMonthly,
      } = req.body;

      // Validate required fields
      if (!name || !slug || !price || !interval || !supportLevel) {
        return errorResponse(
          res,
          "Missing required fields",
          { message: "VALIDATION_ERROR" },
          400
        );
      }

      const newPlan = new SubscriptionPlan({
        name,
        slug,
        price,
        interval,
        trialDays,
        isCustom,
        maxTeamMembers,
        supportLevel,
        limits,
        stripeMonthlyPriceId,
        stripeProductId,
        priceMonthly,
      });

      await newPlan.save();
      return successResponse(res, "Subscription plan created successfully", {
        plan: newPlan,
      });
    } catch (error) {
      console.error("Error creating subscription plan:", error);
      return errorResponse(
        res,
        "Failed to create subscription plan",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },
  updateSubPlan: async (req, res) => {
    try {
      const updateData = req.body;
      const { id } = req.params;

      if (!id) {
        return errorResponse(
          res,
          "Plan ID is required",
          { message: "VALIDATION_ERROR" },
          400
        );
      }

      const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedPlan) {
        return errorResponse(
          res,
          "Subscription plan not found",
          { message: "NOT_FOUND" },
          404
        );
      }

      return successResponse(res, "Subscription plan updated successfully", {
        plan: updatedPlan,
      });
    } catch (error) {
      console.error("Error updating subscription plan:", error);
      return errorResponse(
        res,
        "Failed to update subscription plan",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },
  deleteSubPlan: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return errorResponse(
          res,
          "Plan ID is required",
          { message: "VALIDATION_ERROR" },
          400
        );
      }

      const deletedPlan = await SubscriptionPlan.findByIdAndDelete(id);

      if (!deletedPlan) {
        return errorResponse(
          res,
          "Subscription plan not found",
          { message: "NOT_FOUND" },
          404
        );
      }

      return successResponse(res, "Subscription plan deleted successfully", {
        plan: deletedPlan,
      });
    } catch (error) {
      console.error("Error deleting subscription plan:", error);
      return errorResponse(
        res,
        "Failed to delete subscription plan",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },
  /** @User Access */
  getMySubPlan: async (req, res) => {
    try {
      const userId = req.user.id;
      // Fetch user's subscription plan
      const userPlan = await userSubscriptionModel.findOne({ userId: userId });
      if (!userPlan) {
        return errorResponse(
          res,
          "User subscription not found",
          { message: "NOT_FOUND" },
          404
        );
      }
      const planDetails = await SubscriptionPlan.findById(userPlan.plan);
      if (!planDetails) {
        return errorResponse(
          res,
          "Subscription plan details not found",
          { message: "NOT_FOUND" },
          404
        );
      }
      return successResponse(
        res,
        "User subscription plan fetched successfully",
        {
          planDetails: planDetails,
          userPlan: userPlan,
        }
      );
    } catch (error) {
      console.error("Error fetching user subscription plan:", error);
      return errorResponse(
        res,
        "Failed to fetch user subscription plan",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },
  subscribePlan: async (req, res) => {
    try {
      const userId = req.user.id;
      const { planId, email } = req.body;

      // 1. Validate required data
      if (!planId) {
        return errorResponse(
          res,
          "Plan ID is required",
          { message: "VALIDATION_ERROR" },
          400
        );
      }

      // 2. Check if user already has an active subscription
      const existingSubscription = await userSubscriptionModel.findOne({
        userId,
      });

      if (existingSubscription && existingSubscription?.status === "active") {
        return errorResponse(
          res,
          "User already has an active subscription",
          { message: "ALREADY_SUBSCRIBED" },
          400
        );
      }

      // 3. Validate plan
      const plan = await SubscriptionPlan.findById(planId);
      if (!plan) {
        return errorResponse(
          res,
          "Subscription plan not found",
          { message: "PLAN_NOT_FOUND" },
          404
        );
      }

      if (!plan.stripeMonthlyPriceId) {
        return errorResponse(
          res,
          "Stripe price ID not found for the plan",
          { message: "PRICE_ID_NOT_FOUND" },
          404
        );
      }

      const priceId = plan.stripeMonthlyPriceId;

      // 4. Create or retrieve Stripe customer
      const customer = existingSubscription?.stripeCustomerId
        ? await stripe.customers.retrieve(existingSubscription.stripeCustomerId)
        : await stripe.customers.create({
            email,
            metadata: { userId },
          });

      // 5. Create subscription record in DB if not present
      let subscription = existingSubscription;
      if (!subscription) {
        subscription = await userSubscriptionModel.create({
          userId,
          plan: planId,
          stripeCustomerId: customer.id,
          status: "pending", // will be updated via webhook
        });
      }

      // 6. Create Stripe checkout session
      const stripeSession = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${env.react.url}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.react.url}/subscription/cancel`,
      });

      // 7. Send response
      return successResponse(res, "Subscribed to plan successfully", {
        url: stripeSession.url,
        sessionId: stripeSession.id,
        subscriptionId: subscription._id,
      });
    } catch (error) {
      console.error("Error subscribing to plan:", error);
      return errorResponse(
        res,
        "Failed to subscribe to plan",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },

  getCustomerPortal: async (req, res) => {
    try {
      const userId = req.user.id;
      const subscription = await userSubscriptionModel.findOne({ userId });

      if (!subscription || !subscription.stripeCustomerId) {
        return errorResponse(
          res,
          "No active subscription found",
          { message: "NO_ACTIVE_SUBSCRIPTION" },
          404
        );
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: req.params.customerId || subscription.stripeCustomerId,
        return_url: `${env.react.url}/subscription`,
      });

      return successResponse(res, "Customer portal session created", {
        url: session.url,
      });
    } catch (error) {
      console.error("Error creating customer portal session:", error);
      return errorResponse(
        res,
        "Failed to create customer portal session",
        { message: "INTERNAL_SERVER_ERROR" },
        500
      );
    }
  },
};

module.exports = subsController;
