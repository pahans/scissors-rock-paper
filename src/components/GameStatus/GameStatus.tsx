import { GameChoice, GameStage, Outcome } from "@/types/definitions";

import { BettingStage } from "./BettingStage";
import { PlayingStage } from "./PlayingStage";
import { ShowWinnerStage } from "./ShowWinnerStage";

export interface GameStatusProps {
  gameStage: GameStage;
  playerBestChoice: GameChoice | null;
  winningChoice: GameChoice | null;
  winningAmount: number;
  outcome: Outcome | null;
  computerChoice: GameChoice | null;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  gameStage,
  playerBestChoice,
  winningChoice,
  computerChoice,
  outcome,
  winningAmount,
}) => {
  return (
    <div className="text-center">
      {gameStage === GameStage.Betting && <BettingStage />}
      {gameStage === GameStage.Playing && (
        <PlayingStage
          playerBestChoice={playerBestChoice}
          computerChoice={computerChoice}
        />
      )}
      {gameStage === GameStage.ShowWinner && outcome && (
        <ShowWinnerStage
          outcome={outcome}
          winningChoice={winningChoice}
          winningAmount={winningAmount}
        />
      )}
    </div>
  );
};
