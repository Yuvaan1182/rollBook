const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const SubscriptionPlan = require("../src/models/subscriptionPlan.model");
const env = require("../src/config/env.config");

const plans = [
  {
    name: "Free",
    slug: "free",
    price: 0,
    interval: "month",
    trialDays: 7,
    isCustom: false,
    maxTeamMembers: 1,
    supportLevel: "email",
    features: [
      "Basic Email Support",
      "1 Team Member",
      "Limited Proposals & Invoices",
      "Access to Core Features",
    ],
    limits: {
      maxTokensPerMonth: 1000,
      maxProposalsPerMonth: 2,
      maxInvoicesPerMonth: 3,
    },
    stripeMonthlyPriceId: "price_1RquwOElZvIO9FFbM8B37Vxs",
    stripeProductId: "prod_SmTuIUGvTuqxR1",
    priceMonthly: 0,
    description:
      "Perfect for individuals just getting started. Includes basic email support, 1 team member, and limited usage for proposals and invoices.",
  },
  {
    name: "Pro",
    slug: "pro",
    price: 1499,
    interval: "month",
    trialDays: 14,
    isCustom: false,
    maxTeamMembers: 5,
    supportLevel: "chat",
    features: [
      "Priority Chat Support",
      "Up to 5 Team Members",
      "Increased Proposals & Invoices",
      "Advanced Analytics",
      "Customizable Templates",
    ],
    limits: {
      maxTokensPerMonth: 10000,
      maxProposalsPerMonth: 20,
      maxInvoicesPerMonth: 100,
    },
    popular: true,
    stripeMonthlyPriceId: "price_1Rqt7jElZvIO9FFbGFzcHgjd",
    stripeProductId: "prod_SmS1JtLoVJUyPX",
    priceMonthly: 1499,
    description:
      "Ideal for growing teams. Access more tokens, generate up to 100 invoices/month, and get priority chat support with up to 5 team members.",
  },
  {
    name: "Business",
    slug: "business",
    price: 4999,
    interval: "month",
    trialDays: 0,
    isCustom: false,
    maxTeamMembers: 20,
    supportLevel: "priority",
    features: [
      "24/7 Priority Support",
      "Up to 20 Team Members",
      "High Usage Limits",
      "Dedicated Account Manager",
      "Enterprise Integrations",
    ],
    limits: {
      maxTokensPerMonth: 50000,
      maxProposalsPerMonth: 100,
      maxInvoicesPerMonth: 500,
    },
    stripeMonthlyPriceId: "price_1Rqux4ElZvIO9FFbRsT2Y8IA",
    stripeProductId: "prod_SmTuPkE6AkFSAx",
    priceMonthly: 0,
    description:
      "Designed for large teams and agencies. Includes 20 team members, high usage limits, and priority support for seamless scaling.",
  },
];

const seed = async () => {
  try {
    console.log("Seeding subscription plans...", env.db);

    await mongoose.connect(env.db.mongoURI);
    await SubscriptionPlan.deleteMany({});
    await SubscriptionPlan.insertMany(plans);
    console.log("✅ Subscription plans seeded.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
