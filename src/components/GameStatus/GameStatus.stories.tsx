import type { Meta, StoryFn } from "@storybook/react";

import { GameChoice, GameStage, Outcome } from "@/types/definitions";

import type { GameStatusProps } from ".";
import { GameStatus } from ".";

export default {
  title: "Components/GameStatus",
  component: GameStatus,
} as Meta;

const Template: StoryFn<GameStatusProps> = (args) => <GameStatus {...args} />;

export const Default = Template.bind({});

Default.args = {
  gameStage: GameStage.Betting,
  playerBestChoice: GameChoice.Rock,
  winningChoice: null,
  winningAmount: 0,
  outcome: null,
  computerChoice: null,
};

export const Playing = Template.bind({});
Playing.args = {
  gameStage: GameStage.Playing,
  playerBestChoice: GameChoice.Rock,
  winningChoice: null,
  winningAmount: 0,
  outcome: null,
  computerChoice: GameChoice.Rock,
};

export const ShowWinner = Template.bind({});
ShowWinner.args = {
  gameStage: GameStage.ShowWinner,
  playerBestChoice: GameChoice.Rock,
  winningChoice: GameChoice.Rock,
  winningAmount: 7000,
  outcome: Outcome.Win,
  computerChoice: GameChoice.Rock,
};
