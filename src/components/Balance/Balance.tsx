import { LanguageStrings } from "@/lang";

import { Stat } from "./Stat";

export interface BalanceProps {
  balance: number;
  bet: number;
  win: number;
}

export const Balance: React.FC<BalanceProps> = ({ balance, bet, win }) => {
  const stats = [
    {
      label: LanguageStrings.balance,
      value: balance,
    },
    { label: LanguageStrings.bet, value: bet },
    { label: LanguageStrings.win, value: win },
  ];

  return (
    <div className="bg-gray-900 p-1">
      <div className="container mx-auto flex max-w-lg justify-between px-4 uppercase">
        {stats.map(({ label, value }) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};
