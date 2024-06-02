import React from "react";
import { cn } from "@/lib/utils";

export interface BetOptionProps {
  choice: string;
  betAmount?: number;
  onSelect: (choice: string) => void;
  className?: string;
}

export const BetOption: React.FC<BetOptionProps> = ({
  choice,
  onSelect,
  className,
  betAmount = 0,
}) => {
  return (
    <button
      className={cn(
        "p-4 m-2 rounded cursor-pointer border-4 border-transparent font-bold w-full flex-col items-center space-y-4",
        className,
        {
          "border-gold-500": betAmount > 0,
        }
      )}
      onClick={() => onSelect(choice)}
    >
      <div
        className={cn(
          "flex items-center justify-center mt-2 border-4 border-blue-400 rounded-full w-20 h-20",
          {
            invisible: betAmount === 0,
          }
        )}
      >
        <span className="text-center text-xl">{betAmount}</span>
      </div>
      <div className="text-center text-lg">{choice.toUpperCase()}</div>
    </button>
  );
};

export default BetOption;
