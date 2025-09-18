import axios from "axios";
import React from "react";

type Props = {
  text: string;
};

const Google: React.FC<Props> = ({ text }) => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add validation and API call logic as needed
    const url = "http://localhost:3001/api/v1/auth/google";
    window.location.href = url;
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center justify-center w-full gap-3 px-5 py-3 font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-50"
    >
      {/* Google Logo */}
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.5 0 6.6 1.2 9 3.3l6.7-6.7C35.4 2.7 30.1 0 24 0 14.6 0 6.5 5.7 2.6 14l7.9 6.1C12.1 13.6 17.6 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9C43.5 38.2 46.5 31.9 46.5 24.5z"
        />
        <path
          fill="#FBBC05"
          d="M10.5 28.1c-1-3-1-6.2 0-9.2l-7.9-6.1C-.7 17.9-.7 31 2.6 38l7.9-6.1z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.5 0 11.9-2.1 15.8-5.7l-7.6-5.9c-2.1 1.4-4.9 2.3-8.2 2.3-6.4 0-11.9-4.1-13.5-9.9l-7.9 6.1C6.5 42.3 14.6 48 24 48z"
        />
      </svg>

      <span>{text}</span>
    </button>
  );
};

export default Google;
