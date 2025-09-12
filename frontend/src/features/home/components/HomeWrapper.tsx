import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import PricingSection from "./PricingSection";
import WelcomeSection from "./WelcomeSection";
import FeaturesSection from "./FeaturesSection";

const HeroWrapper = () => {
  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* <Navbar /> */}
      <Navbar />
      <WelcomeSection />
      <FeaturesSection />
      {/* <HowItWorks /> */}
      <PricingSection />
      <Footer />
    </div>
  );
};

export default HeroWrapper;
