import { MoveRight } from "lucide-react";
import projections from "../../../assets/svgs/fall.svg";

const WelcomeSection = () => {
  return (
    <div className="flex items-center h-screen justify-center relative overflow-hidden px-40">
      <img
        className="scale-[1.65] absolute right-[0px]"
        src={projections}
        alt="hero-bg"
      />
      <div className="z-10 flex">
        <div className="flex-1/2 flex flex-col gap-8">
          <h1 className="font-bold text-7xl">{`“Simplify Invoicing, Payments & Subscriptions – All in One Hub.”`}</h1>
          <p className="font-light tracking-wider text-xl">
            Send professional invoices, track payments, manage subscriptions,
            and grow your freelance business effortlessly.
          </p>
          <button className="flex p-4 rounded-md bg-[#FFD93D] w-1/2 items-center justify-center gap-4 font-bold tracking-wider text-lg hover:bg-[#f3da73] transition">
            GET STARTED <MoveRight />
          </button>
        </div>
        <div className="flex-1/2"></div>
      </div>
    </div>
  );
};

export default WelcomeSection;
