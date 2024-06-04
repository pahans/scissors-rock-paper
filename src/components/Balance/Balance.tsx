import * as React from "react";

import { Stat } from "./Stat";

export interface BalanceProps {
  balance: number;
  bet: number;
  win: number;
}

export const Balance: React.FC<BalanceProps> = ({ balance, bet, win }) => {
  const stats = [
    { label: "BALANCE", value: balance },
    { label: "BET", value: bet },
    { label: "WIN", value: win },
  ];

  return (
    <div className="bg-gray-900 p-1">
      <div className="container mx-auto flex max-w-lg justify-between px-4">
        {stats.map(({ label, value }) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};
