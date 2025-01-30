import React from "react";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <svg
        className="animate-spin h-16 w-16 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M5 25c0-2.71 1.44-5.28 3.76-6.72L5 9.4C2.12 12.16 0 16.75 0 21c0 8.28 6.72 15 15 15 3.6 0 6.87-1.3 9.31-3.47l-2.43-2.44C18.35 32.2 12.77 35 7 35c-6.28 0-11-4.72-11-10z"
        />
      </svg>
    </div>
  );
};

export default PageLoader;
