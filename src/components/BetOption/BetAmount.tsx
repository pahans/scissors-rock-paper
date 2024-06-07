import { cn } from "@/utils";

interface BetAmountProps {
  betAmount: number;
}

const BetAmount: React.FC<BetAmountProps> = ({ betAmount }) => {
  return (
    <span
      className={cn(
        "flex items-center justify-center mt-2 border-4 border-blue-400 rounded-full w-10 h-10 md:w-16 md:h-16 bg-white text-black",
        {
          invisible: betAmount === 0,
        },
      )}
    >
      <span className="text-center text-xs md:text-xl">{betAmount}</span>
    </span>
  );
};

export default BetAmount;
