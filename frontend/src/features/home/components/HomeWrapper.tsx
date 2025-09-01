import ServiceSection from "./ServiceSection";
import WelcomeSection from "./WelcomeSection";

const HeroWrapper = () => {
  return (
    <div className="flex flex-col">
      <WelcomeSection />
      <ServiceSection />
    </div>
  );
};

export default HeroWrapper;
