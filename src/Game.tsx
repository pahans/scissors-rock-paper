import { Balance } from "@/components/Balance";
import { BetOption } from "@/components/BetOption";
import { Button } from "@/components/Button";
import { GameChoice, gameChoicesConfig } from "@/config/gameConfig";
import { useGameContext } from "@/context/GameContext";
import { useGameActions } from "@/hooks/useGameActions";

function Game() {
  const { state } = useGameContext();
  const { placeBet, startGame, resetGame } = useGameActions();
  const {
    balance,
    win,
    selectedChoices,
    errorMessage,
    gameStage,
    computerChoice,
    winningChoice,
  } = state;

  const totalBet = Object.values(selectedChoices).reduce(
    (sum, amount) => sum + (amount || 0),
    0,
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-gray-600 to-gray-900">
      <Balance balance={balance} bet={totalBet} win={win} />
      <div className="mb-4 grid h-60 items-center text-center text-white">
        {gameStage === "betting" && (
          <h3 className="self-end text-2xl font-semibold uppercase text-gold-500">
            Pick Your Positions
          </h3>
        )}
        {gameStage === "playing" && (
          <h3 className="text-3xl">
            {Object.keys(selectedChoices).join(",")} vs {computerChoice}
          </h3>
        )}
        {errorMessage && <h3 className="text-xl">{errorMessage}</h3>}
        {gameStage === "showWinner" && winningChoice && (
          <>
            <h3 className="text-xl uppercase">{winningChoice} won</h3>
          </>
        )}
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
            />
          ))}
        </div>

        <div className="my-4 flex w-full items-center justify-center space-x-4">
          {(gameStage === "betting" || gameStage === "playing") && (
            <Button onClick={startGame} disabled={gameStage === "playing"}>
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
