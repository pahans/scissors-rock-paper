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
        "m-2 w-full cursor-pointer flex-col items-center space-y-4 rounded border-4 border-transparent p-4 font-bold",
        className,
        {
          "border-gold-500": betAmount > 0,
        },
      )}
      onClick={() => onSelect(choice)}
    >
      <div
        className={cn(
          "mt-2 flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-400",
          {
            invisible: betAmount === 0,
          },
        )}
      >
        <span className="text-center text-xl">{betAmount}</span>
      </div>
      <div className="text-center text-lg">{choice.toUpperCase()}</div>
    </button>
  );
};

export default BetOption;
