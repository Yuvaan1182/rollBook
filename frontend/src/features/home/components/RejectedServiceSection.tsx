import { Settings } from "lucide-react";
import nightCalls from "../../../assets/svgs/night-calls.svg";
import service1 from "../../../assets/svgs/designer.svg";
import circles from "../../../assets/svgs/circles.svg";

const ServiceSection = () => {
  return (
    <div className="relative overflow-x-hidden px-40 py-20">
      <img
        className="absolute scale-[2] -right-50 top-30"
        // src={circles}
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
              <span className="inline-block transform -rotate-3 bg-text2 text-[#111] text-2xl uppercase font-bold text-center px-10 py-2 bg-[#FFD93D]">
                Invoxyhub
              </span>
            </div>
          </div>
          <div className="z-10 flex flex-wrap gap-10 py-10">
            <div className="bg-white flex-none flex flex-col w-[300px] group shadow-md transition-all delay-200 rounded-2xl items-center gap-4 py-8 px-6">
              <div className="relative w-42 h-42 bg-[#FFF3C4] rounded-full flex items-center justify-center">
                <img
                  className="w-full group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:scale-110 delay-150 transition-all"
                  src={service1}
                  alt="Service 1"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-semibold ">
                  Write Winning Proposals with AI.
                </h2>
                <p className="text-center text-sm">
                  Get more approvals and save time with smart, tailored
                  suggestions.
                </p>
              </div>
            </div>
            <div className="bg-white flex-none flex flex-col w-[300px] group shadow-md transition-all delay-200 rounded-2xl items-center gap-4 py-8 px-6">
              <div className="relative w-42 h-42 bg-[#FFF3C4] rounded-full flex items-center justify-center">
                <img
                  className="w-full group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:scale-110 delay-150 transition-all"
                  src={service1}
                  alt="Service 1"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-semibold ">
                  Write Winning Proposals with AI.
                </h2>
                <p className="text-center text-sm">
                  Get more approvals and save time with smart, tailored
                  suggestions.
                </p>
              </div>
            </div>
            <div className="basis-full"></div>
            <div className="bg-white flex-none flex flex-col w-[300px] group shadow-md transition-all delay-200 rounded-2xl items-center gap-4 py-8 px-6">
              <div className="relative w-42 h-42 bg-[#FFF3C4] rounded-full flex items-center justify-center">
                <img
                  className="w-full group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:scale-110 delay-150 transition-all"
                  src={service1}
                  alt="Service 1"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-semibold ">
                  Write Winning Proposals with AI.
                </h2>
                <p className="text-center text-sm">
                  Get more approvals and save time with smart, tailored
                  suggestions.
                </p>
              </div>
            </div>
            <div className=" bg-white flex-none flex flex-col w-[300px] group shadow-md transition-all delay-200 rounded-2xl items-center gap-4 py-8 px-6">
              <div className="relative w-42 h-42 bg-[#FFF3C4] rounded-full flex items-center justify-center">
                <img
                  className="w-full group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:scale-110 delay-150 transition-all"
                  src={service1}
                  alt="Service 1"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-semibold ">
                  Write Winning Proposals with AI.
                </h2>
                <p className="text-center text-sm">
                  Get more approvals and save time with smart, tailored
                  suggestions.
                </p>
              </div>
            </div>
            <div className="bg-white flex-none flex flex-col w-[300px] group shadow-md transition-all delay-200 rounded-2xl items-center gap-4 py-8 px-6">
              <div className="relative w-42 h-42 bg-[#FFF3C4] rounded-full flex items-center justify-center">
                <img
                  className="w-full group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:scale-110 delay-150 transition-all"
                  src={service1}
                  alt="Service 1"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-semibold ">
                  Write Winning Proposals with AI.
                </h2>
                <p className="text-center text-sm">
                  Get more approvals and save time with smart, tailored
                  suggestions.
                </p>
              </div>
            </div>
            <div className="bg-white flex-none flex flex-col w-[300px] group shadow-md transition-all delay-200 rounded-2xl items-center gap-4 py-8 px-6">
              <div className="relative w-42 h-42 bg-[#FFF3C4] rounded-full flex items-center justify-center">
                <img
                  className="w-full group-hover:absolute group-hover:top-0 group-hover:left-0 group-hover:scale-110 delay-150 transition-all"
                  src={service1}
                  alt="Service 1"
                />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-semibold ">
                  Write Winning Proposals with AI.
                </h2>
                <p className="text-center text-sm">
                  Get more approvals and save time with smart, tailored
                  suggestions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
