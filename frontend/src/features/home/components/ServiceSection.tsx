import ServiceCard from "./ServiceCard";
import type { FC } from "react";
import featuresData from "../utils/features.json";

import {
  FileText,
  BarChart,
  CreditCard,
  CheckCircle,
  Briefcase,
  Repeat,
} from "lucide-react";

// Map icon strings to actual components
const iconMap: Record<string, React.ElementType> = {
  FileText,
  BarChart,
  CreditCard,
  CheckCircle,
  Briefcase,
  Repeat,
};

// Convert JSON data into usable objects with real icons
export const features = featuresData.map((f) => ({
  ...f,
  icon: iconMap[f.icon],
}));

const ServiceSection: FC = () => {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
        <p className="mt-4 text-lg text-gray-600">
          Everything you need to manage invoicing, payments, and
          expenses—seamlessly.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ServiceCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
