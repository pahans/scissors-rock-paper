import { GameChoice, GameStage, Outcome } from "@/types/definitions";

import { BettingStage } from "./BettingStage";
import { PlayingStage } from "./PlayingStage";
import { ShowWinnerStage } from "./ShowWinnerStage";

export interface GameStatusProps {
  gameStage: GameStage;
  selectedChoices: { [key in GameChoice]?: number };
  winningChoice: GameChoice | null;
  winningAmount: number;
  outcome: Outcome | null;
  computerChoice: GameChoice | null;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  gameStage,
  selectedChoices,
  winningChoice,
  computerChoice,
  outcome,
  winningAmount,
}) => {
  const selectedChoicesStr = Object.keys(selectedChoices).join(",");

  return (
    <div className="text-center">
      {gameStage === "betting" && <BettingStage />}
      {gameStage === "playing" && (
        <PlayingStage
          selectedChoices={selectedChoicesStr}
          computerChoice={computerChoice}
        />
      )}
      {gameStage === "showWinner" && outcome && (
        <ShowWinnerStage
          outcome={outcome}
          winningChoice={winningChoice}
          winningAmount={winningAmount}
        />
      )}
    </div>
  );
};
