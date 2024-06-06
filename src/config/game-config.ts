import type { GameChoiceConfig } from "@/types/definitions";
import { GameChoice } from "@/types/definitions";

export const CALCULATE_RESULT_DELAY = 3000;

export const startingBalance = 5000;

export const betSize = 500;

export type WIN_RATES = Record<string, number>;

export const winRates: WIN_RATES = {
  1: 14,
  2: 3,
};

export const gameChoicesConfig: GameChoiceConfig = {
  rock: {
    label: "ROCK",
    beats: [GameChoice.Scissors],
    colorClassName: "bg-blue-800/25 text-blue-500 ring-blue-700",
  },
  paper: {
    label: "PAPER",
    beats: [GameChoice.Rock],
    colorClassName: "bg-green-800/25 text-green-500 ring-green-700",
  },
  scissors: {
    label: "SCISSORS",
    beats: [GameChoice.Paper],
    colorClassName: "bg-red-800/25 text-red-500 ring-red-700",
  },
};
