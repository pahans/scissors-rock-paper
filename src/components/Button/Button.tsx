import React from "react";

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="mt-6 hover:opacity-70 p-4 bg-black text-gold-500 border-gold-500 border-2 px-8 text-lg rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
