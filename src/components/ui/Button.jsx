import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition duration-200";

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600",
    secondary:
      "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;