// backend/src/controllers/subscription/subs.controller.js
const stripe = require("../../config/stripe.config");
const env = require("../../config/env.config");
const {
  successResponse,
  errorResponse,
} = require("../../utils/response.utils");
const userSubscriptionModel = require("../../models/userSubscription.model");
const {
  subscriptionConfirmationTemplate,
} = require("../../../public/email-templates/templates");
const emailQueue = require("../../jobs/queues/emailQueue");
const from = require("../../config/env.config").emailProviders.resend
  .senderEmail;

const webhookController = {
  stripeWebhookHandler: async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.payments.stripe.webhookSecret
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return errorResponse(res, `Webhook Error: ${err.message}`, err, 400);
    }

    try {
      switch (event.type) {
        case "invoice.payment_succeeded": {
          const invoice = event.data.object;
          let subscriptionId = invoice.subscription;

          // If top-level subscription is missing, check parent.subscription_details
          if (
            !subscriptionId &&
            invoice.parent?.subscription_details?.subscription
          ) {
            subscriptionId = invoice.parent.subscription_details.subscription;
          }

          if (!subscriptionId) {
            console.error(`Invoice ${invoice.id} has no subscription attached`);
            return; // or handle as one-time payment
          }

          // Retrieve subscription from Stripe
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          // Now you can safely use subscription fields
          const customerId = subscription.customer;

          const currentPeriodStart = new Date(subscription.start_date * 1000);
          // Calculate currentPeriodEnd based on interval
          let currentPeriodEnd;
          const interval = subscription.plan.interval; // 'month' or 'year'
          const intervalCount = subscription.plan.interval_count || 1;

          currentPeriodEnd = new Date(currentPeriodStart);
          if (interval === "month") {
            currentPeriodEnd.setMonth(
              currentPeriodEnd.getMonth() + intervalCount
            );
          } else if (interval === "year") {
            currentPeriodEnd.setFullYear(
              currentPeriodEnd.getFullYear() + intervalCount
            );
          }

          const cancelAtPeriodEnd = subscription.cancel_at_period_end; // false
          const endDate = subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null;

          // Upsert(update + insert) subscription record
          const updatedUserSubDetails =
            await userSubscriptionModel.findOneAndUpdate(
              { stripeCustomerId: customerId },
              {
                status: subscription.status,
                currentPeriodStart: currentPeriodStart,
                currentPeriodEnd: currentPeriodEnd,
                cancelAtPeriodEnd: cancelAtPeriodEnd,
                stripeSubscriptionId: subscription.id,
                endDate: endDate,
              },
              { upsert: true, new: true }
            );
          if (!updatedUserSubDetails) {
            console.error(
              "❌ Failed to upsert subscription record for customerId:",
              customerId
            );
            return errorResponse(
              res,
              "Failed to upsert subscription record",
              { message: "UPSERT_FAILED" },
              500
            );
          }

          const customer = await stripe.customers.retrieve(
            subscription.customer
          );

          // Queue confirmation email
          // TODO: Implement email queue Handler for `subscriptionConfirmation`
          await emailQueue.add("subscriptionConfirmation", {
            to: customer.email,
            subject: `${subscription.items.data[0].price.nickname} Subscribed Successfully`,
            type: "subscription",
            from: from,
            html: subscriptionConfirmationTemplate(
              "ABC",
              subscription.items.data[0].price.nickname,
              new Date(subscription.current_period_end * 1000)
            ),
            text: `Subscription to plan: ${subscription.items.data[0].price.nickname} is successful. 
            Next billing date: ${new Date(subscription.current_period_end * 1000)}. 
            You now have full access to all premium features. We’re excited to have you on board!.
             © ${new Date().getFullYear()} Your Company Name. All rights reserved.
            If you have any questions, reply to this email or contact us at support@invoxyhub.com.`,
          });

          console.log("✅ New subscription recorded for user:", customer.email);
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object;
          const customerId = subscription.customer;

          const UserSubscription = await userSubscriptionModel.findOne({
            stripeCustomerId: customerId,
          });

          // Update subscription details (renewals, cancellations, plan changes)
          await UserSubscription.findOneAndUpdate(
            {
              status: subscription.status,
              currentPeriodStart: new Date(
                subscription.current_period_start * 1000
              ),
              currentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
            { new: true }
          );

          const user = await userSubscriptionModel.findOne({
            _id: UserSubscription.userId,
          });

          // Queue status-change email
          // TODO: Implement email queue Handler for `subscriptionStatusChange`
          await emailQueue.add("subscriptionUpdated", {
            to: session.customer_email,
            subject: `${subscription.items.data[0].price.nickname} Updated Subscription Successfully`,
            type: "subscription-updation-successful",
            from: from,
            html: subscriptionConfirmationTemplate(
              "ABC",
              subscription.items.data[0].price.nickname,
              new Date(subscription.current_period_end * 1000)
            ),
            text: `Subscription to plan: ${subscription.items.data[0].price.nickname} is successful. 
            Next billing date: ${new Date(subscription.current_period_end * 1000)}. 
            You now have full access to all premium features. We’re excited to have you on board!.
             © ${new Date().getFullYear()} Your Company Name. All rights reserved.
            If you have any questions, reply to this email or contact us at support@invoxyhub.com.`,
          });

          console.log(
            `🔄 Subscription updated for user: ${user.email} → ${subscription.status}`
          );
          break;
        }

        default:
          console.log(`ℹ️ Unhandled event type: ${event.type}`);
      }

      return successResponse(res, "✅ Webhook processed", null, 200);
    } catch (err) {
      console.error("❌ Error handling webhook:", err);
      return errorResponse(res, "Server Error", err, 500);
    }
  },
};

module.exports = webhookController;
