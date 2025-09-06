import React from "react";
import { User, FileText, Send, CreditCard } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Sign Up Instantly",
    description:
      "Create your account quickly and start managing invoices without hassle.",
  },
  {
    icon: FileText,
    title: "Create Professional Invoices",
    description:
      "Use beautiful templates or customize your own for a polished look.",
  },
  {
    icon: Send,
    title: "Send & Track",
    description:
      "Email invoices directly and monitor payment status in real-time.",
  },
  {
    icon: CreditCard,
    title: "Get Paid Faster",
    description:
      "Receive payments securely and save time for what matters most.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#F6F1E9]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#4F200D] text-center mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center w-[250px] relative px-6 py-4 bg-white rounded-md shadow-lg hover:shadow-2xl transition gap-4"
                style={{
                  clipPath:
                    "path('M 0,70 A 0,0,0 70,0 L 250,0 L 250, 250 L 0,250 L 0,64 Z')",
                }}
              >
                <div className="flex gap-10 items-center justify-center w-full">
                  {/* Step Number */}
                  <div
                    className="w-16 h-16 flex items-center justify-center -top-4 -left-4 absolute rounded-full font-bold text-white text-lg"
                    style={{
                      backgroundColor: "#FF9A00",
                    }}
                  >
                    {idx + 1}
                  </div>
                  {/* Icon */}
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "#FFD93D" }}
                  >
                    <Icon className="w-8 h-8 text-[#4F200D]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#4F200D]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#4F200D]/80 text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
