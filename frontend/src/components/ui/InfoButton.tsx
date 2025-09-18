import { Info } from "lucide-react";
import { useState } from "react";

const InfoButton = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)} // show when tabbed/focused
        onBlur={() => setShow(false)} // hide when leaving focus
        className="p-1 transition rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="More information"
      >
        <Info className="w-4 h-4 text-gray-600" />
      </button>

      {show && (
        <div
          role="tooltip"
          className="absolute z-10 px-3 py-1 text-sm text-white -translate-y-1/2 bg-gray-800 rounded-lg shadow-lg left-8 top-1/2 w-72"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoButton;
