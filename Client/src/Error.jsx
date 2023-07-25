import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 rounded-md p-6">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block mr-2 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.492-1.615 1.739-2.89l-6.928-12.222a1.605 1.605 0 00-2.734 0L3.301 18.11C2.547 19.384 3.498 21 5.037 21zM20 10a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
        <span className="text-red-800 font-medium">{message}</span>
      </div>
    </div>
  );
};

export default ErrorComponent;
