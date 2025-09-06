import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import PricingSection from "./PricingSection";
import ServiceSection from "./ServiceSection";
import WelcomeSection from "./WelcomeSection";

const HeroWrapper = () => {
  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* <Navbar /> */}
      <Navbar />
      <WelcomeSection />
      <ServiceSection />
      {/* <HowItWorks /> */}
      <PricingSection />
      <Footer />
    </div>
  );
};

export default HeroWrapper;
