export type GameChoiceConfig = Record<
  GameChoice,
  {
    label: string;
    beats: string[];
    colorClassName: string;
  }
>;
export type GameChoice = "rock" | "paper" | "scissors";

export const CALCULATE_RESULT_DELAY = 3000;

export const startingBalance = 5000;

export const betSize = 500;

export const winRates: Record<number, number> = {
  1: 14,
  2: 3,
};

export const gameChoicesConfig: GameChoiceConfig = {
  rock: {
    label: "ROCK",
    beats: ["scissors"],
    colorClassName: "bg-blue-800/25 text-blue-500 ring-blue-700",
  },
  paper: {
    label: "PAPER",
    beats: ["rock"],
    colorClassName: "bg-green-800/25 text-green-500 ring-green-700",
  },
  scissors: {
    label: "SCISSORS",
    beats: ["paper"],
    colorClassName: "bg-red-800/25 text-red-500 ring-red-700",
  },
};
