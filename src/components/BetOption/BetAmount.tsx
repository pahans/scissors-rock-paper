import { cn } from "@/utils";

interface BetAmountProps {
  betAmount: number;
}

const BetAmount: React.FC<BetAmountProps> = ({ betAmount }) => {
  return (
    <span
      className={cn(
        "flex items-center justify-center mt-2 border-4 border-blue-400 rounded-full w-16 h-16 bg-white text-black",
        {
          invisible: betAmount === 0,
        },
      )}
    >
      <span className="text-center text-xl">{betAmount}</span>
    </span>
  );
};

export default BetAmount;
