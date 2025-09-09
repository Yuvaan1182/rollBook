import React, { useEffect } from "react";

const plans = [
  {
    name: "Free Plan",
    description: "Start invoicing for free",
    price: "₹0",
    period: "/month",
    features: [
      "Create up to 5 invoices per month",
      "Basic invoice template",
      "Email invoices directly from the platform",
      "Manage your clients easily",
    ],
    popular: false,
    buttonText: "Sign Up Free",
  },
  {
    name: "Pro Plan",
    description: "Level up your freelance business",
    price: "₹499",
    period: "/month",
    features: [
      "Unlimited invoices & clients",
      "Customizable invoice templates",
      "PDF download & branding options",
      "Payment tracking & reminders",
      "Priority email support",
    ],
    popular: true,
    buttonText: "Get Started",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-[#f4f4f4] py-14">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#4F200D]">Pricing</h2>
          <p className="mt-2 text-[#4F200D]/70">
            Simple invoicing for freelancers. <br className="sm:hidden" />
            Create, send, and track payments in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col bg-white rounded-lg shadow-lg p-8 h-full`}
            >
              {plan.popular && (
                <span className="absolute -top-4 right-4 bg-[#FF9A00] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-[#4F200D] mb-3">
                {plan.name}
              </h3>
              <p className="text-sm text-[#4F200D]/70 mb-4">
                {plan.description}
              </p>

              <div className="text-4xl font-bold text-[#FFD93D] mb-2">
                {plan.price}{" "}
                <span className="text-base text-[#4F200D]/50 font-normal">
                  {plan.period}
                </span>
              </div>

              <ul className="mb-6 text-[#4F200D]/80 space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center">
                    <span className="text-[#FF9A00] mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto text-white text-lg font-semibold px-5 py-2 rounded transition ${
                  plan.popular
                    ? "bg-[#FF9A00] hover:bg-[#e68a00]"
                    : "bg-[#FFD93D] text-[#4F200D] hover:bg-[#e6cc33]"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
