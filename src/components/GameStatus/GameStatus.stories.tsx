import { Meta, StoryFn } from "@storybook/react";

import { GameStatus, GameStatusProps } from ".";

export default {
  title: "Components/GameStatus",
  component: GameStatus,
} as Meta;

const Template: StoryFn<GameStatusProps> = (args) => <GameStatus {...args} />;

export const Default = Template.bind({});

Default.args = {
  gameStage: "betting",
  selectedChoices: {},
  winningChoice: null,
  winningAmount: 0,
  outcome: null,
  computerChoice: null,
};

export const Playing = Template.bind({});
Playing.args = {
  gameStage: "playing",
  selectedChoices: {
    rock: 1000,
    paper: 500,
  },
  winningChoice: null,
  winningAmount: 0,
  outcome: null,
  computerChoice: "rock",
};

export const ShowWinner = Template.bind({});
ShowWinner.args = {
  gameStage: "showWinner",
  selectedChoices: {
    rock: 1000,
  },
  winningChoice: "rock",
  winningAmount: 7000,
  outcome: "win",
  computerChoice: "rock",
};
