export interface BalanceProps {
  balance: number;
  bet: number;
  win: number;
}

export const Balance: React.FC<BalanceProps> = ({ balance, bet, win }) => {
  return (
    <div className="flex justify-between bg-gray-800 p-4 text-gold-500">
      <span>BALANCE: {balance}</span>
      <span>BET: {bet}</span>
      <span>WIN: {win}</span>
    </div>
  );
};
