export type GameChoice = "rock" | "paper" | "scissors";

export interface Bet {
  amount: number;
  choices: GameChoice[];
}
