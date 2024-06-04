import * as React from "react";

import { cn } from "@/utils";

import BetAmount from "./BetAmount";

export interface BetOptionProps {
  choice: string;
  betAmount?: number;
  onSelect: (choice: string) => void;
  className?: string;
  disabled?: boolean;
}

export const BetOption: React.FC<BetOptionProps> = ({
  choice,
  onSelect,
  className,
  disabled = false,
  betAmount = 0,
}) => {
  return (
    <button
      className={cn(
        "p-4 rounded-lg cursor-pointer ring-2 ring-transparent font-bold w-full flex flex-col justify-center items-center space-y-4 disabled:cursor-not-allowed",
        className,
        {
          "ring-[6px]": betAmount > 0,
        },
      )}
      disabled={disabled}
      onClick={() => onSelect(choice)}
    >
      <BetAmount betAmount={betAmount} />
      <span className="text-3xl">{choice.toUpperCase()}</span>
    </button>
  );
};

export default BetOption;