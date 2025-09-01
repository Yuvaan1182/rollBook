import { Settings } from "lucide-react";
import nightCalls from "../../../assets/svgs/night-calls.svg";

const ServiceSection = () => {
  return (
    <div className="relative h-screen border-2 overflow-hidden px-40 py-20">
      <img
        className="absolute -right-50 -top-30"
        src={nightCalls}
        alt="Service bg"
      />
      <div>
        <div className="flex flex-col gap-5 z-10">
          <div>
            <h1 className="bg-text flex items-center gap-1 justify-center w-[200px] bg-[#FFD93D] font-semibold p-2">
              <Settings size={16} />
              Services
            </h1>
          </div>
          <div className="flex flex-col gap-1 text-5xl z-10">
            <div>Everything you need to manage</div>
            <div>
              your{" "}
              <span className="text-[#FF9A00] text-7xl capitalize">
                freelance invoicing.
              </span>
            </div>
            <div className="text-2xl">
              Save{" "}
              <span className="text-[#FF9A00] text-5xl capitalize">time</span>,
              look{" "}
              <span className="text-[#FF9A00] text-5xl capitalize">
                professional
              </span>
              , and get
            </div>
            <div className="text-2xl">
              paid
              <span className="text-[#FF9A00] text-5xl capitalize">
                {" "}
                Faster
              </span>{" "}
              with
              <span className="bg-text2 text-[#111] text-2xl uppercase font-bold text-center px-10 py-2 bg-[#FFD93D]">
                Invoxyhub
              </span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
