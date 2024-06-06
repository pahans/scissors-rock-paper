import { Balance } from "@/components/Balance";
import { BetOption } from "@/components/BetOption";
import { Button } from "@/components/Button";
import { GameStatus } from "@/components/GameStatus";
import { gameChoicesConfig } from "@/config/game-config";
import { useGameActions } from "@/hooks/use-game-actions";
import { GameChoice } from "@/types/definitions";

import { useGameContext } from "./hooks/use-game-context";

function Game() {
  const {
    state: {
      balance,
      win,
      selectedChoices,
      errorMessage,
      gameStage,
      winningChoice,
      winAmount,
      outcome,
      computerChoice,
      playerBestChoice,
    },
  } = useGameContext();

  const { placeBet, startGame, resetGame } = useGameActions();

  const totalBet = Object.values(selectedChoices).reduce(
    (sum, amount) => sum + (amount || 0),
    0,
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-gray-600 to-gray-900">
      <Balance balance={balance} bet={totalBet} win={win} />
      <div className="mb-4 grid h-60 items-center text-center text-white">
        {errorMessage && (
          <h3 className="text-xl font-semibold text-red-400">{errorMessage}</h3>
        )}
        <GameStatus
          gameStage={gameStage}
          playerBestChoice={playerBestChoice}
          winningChoice={winningChoice}
          winningAmount={winAmount}
          outcome={outcome}
          computerChoice={computerChoice}
        />
      </div>

      <div className="container mx-auto max-w-2xl px-4">
        <div className="mt-8 flex gap-8">
          {Object.keys(gameChoicesConfig).map((choice) => (
            <BetOption
              key={choice}
              choice={choice as GameChoice}
              className={gameChoicesConfig[choice as GameChoice].colorClassName}
              betAmount={selectedChoices[choice as GameChoice] || 0}
              onSelect={() => placeBet(choice as GameChoice)}
              disabled={gameStage !== "betting"}
              highlight={choice === playerBestChoice}
            />
          ))}
        </div>

        <div className="my-4 flex w-full items-center justify-center space-x-4">
          {(gameStage === "betting" || gameStage === "playing") && (
            <Button
              onClick={startGame}
              disabled={gameStage === "playing" || totalBet === 0}
            >
              PLAY
            </Button>
          )}
          {gameStage === "showWinner" && (
            <Button onClick={resetGame}>CLEAR</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
