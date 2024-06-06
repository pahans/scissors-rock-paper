import * as React from "react";

import { cn } from "@/utils";

import BetAmount from "./BetAmount";

export interface BetOptionProps {
  choice: string;
  betAmount?: number;
  onSelect: (choice: string) => void;
  className?: string;
  disabled?: boolean;
  highlight?: boolean;
}

export const BetOption: React.FC<BetOptionProps> = ({
  choice,
  onSelect,
  className,
  disabled = false,
  betAmount = 0,
  highlight = false,
}) => {
  return (
    <button
      className={cn(
        "p-4 rounded-lg cursor-pointer ring-2 ring-transparent font-bold w-full flex flex-col justify-center items-center space-y-4 disabled:cursor-not-allowed",
        className,
        {
          "ring-6": highlight,
        },
      )}
      data-testid="bet-option"
      disabled={disabled}
      onClick={() => onSelect(choice)}
    >
      <BetAmount betAmount={betAmount} />
      <span className="text-3xl">{choice.toUpperCase()}</span>
    </button>
  );
};

export default BetOption;
