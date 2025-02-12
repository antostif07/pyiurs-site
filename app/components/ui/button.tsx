import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all ${className}`}
    >
      {children}
    </button>
  );
};
