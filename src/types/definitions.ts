export type GameStage = "betting" | "playing" | "showWinner";

export type GameChoiceConfig = Record<
  GameChoice,
  {
    label: string;
    beats: string[];
    colorClassName: string;
  }
>;
export type GameChoice = "rock" | "paper" | "scissors";

export type Outcome = "tie" | "win" | "loss";

export interface GameState {
  balance: number;
  win: number;
  selectedChoices: { [key in GameChoice]?: number };
  computerChoice: GameChoice | null;
  gameStage: GameStage;
  winningChoice: GameChoice | null;
  errorMessage: string | null;
  winAmount: number;
  outcome: Outcome | null;
}
