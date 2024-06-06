import { type GameChoice, Outcome } from "@/types/definitions";
import { cn } from "@/utils";

export const ShowWinnerStage: React.FC<{
  outcome: Outcome;
  winningChoice: GameChoice | null;
  winningAmount: number;
}> = ({ outcome, winningChoice, winningAmount }) => (
  <div className={cn("text-5xl font-semibold uppercase space-y-8")}>
    {outcome === Outcome.Win && (
      <>
        <h3 className="text-green-600">{winningChoice} won</h3>
        <div>
          <span className="px-2 text-gold-500">You win</span> {winningAmount}
        </div>
      </>
    )}
    {outcome === Outcome.Loss && (
      <>
        <h3 className="text-red-600">{winningChoice} won</h3>
        <div>You lose</div>
      </>
    )}
    {outcome == Outcome.Tie && <h3>Game Tied, Bet Returned</h3>}
  </div>
);
