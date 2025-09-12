import React from "react";
import clsx from "clsx";

export default function Button({ 
  children, 
  className, 
  variant,  // no default here
  ...props 
}) {
  const baseStyles =
    "px-4 py-2 rounded-2xl font-medium transition-colors duration-200 cursor-pointer";

  const variants = {
    primary: "mt-6 w-full bg-[#fa2a00] text-white font-semibold py-2 px-4 rounded hover:bg-[#fa2a00e6] transition",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-900 hover:bg-gray-100",
    continue: "flex items-center gap-2 px-8 py-4 bg-[#fa2a00] hover:bg-[#fa2a00e6] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#fa2a00]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    back: "flex items-center gap-2 px-8 py-4 bg-[#fa2a00] hover:bg-[#fa2a00e6] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#fa2a00]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  };

  return (
    <button
      className={clsx(baseStyles, variant && variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
