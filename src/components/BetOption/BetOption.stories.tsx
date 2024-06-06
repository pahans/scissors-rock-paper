import type { Meta, StoryFn } from "@storybook/react";

import { GameChoice } from "@/types/definitions";

import type { BetOptionProps } from "./BetOption";
import { BetOption } from "./BetOption";

export default {
  title: "Components/BetOption",
  component: BetOption,
} as Meta;

const Template: StoryFn<BetOptionProps> = (args: BetOptionProps) => <BetOption {...args} />;

export const Rock = Template.bind({});
Rock.args = {
  choice: GameChoice.Rock,
  className: "bg-blue-300 text-blue-500 border-blue-500",
};

export const Paper = Template.bind({});
Paper.args = {
  choice: GameChoice.Paper,
  className: "bg-green-300 text-green-500 border-green-500",
};

export const Scissors = Template.bind({});
Scissors.args = {
  choice: GameChoice.Scissors,
  className: "bg-red-300 text-red-500 border-red-500",
};

export const Amount = Template.bind({});
Amount.args = {
  choice: GameChoice.Rock,
  betAmount: 1000,
  className: "bg-blue-300 text-blue-500 border-blue-500",
};
