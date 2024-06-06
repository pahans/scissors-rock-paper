import type { Meta, StoryFn } from "@storybook/react";

import type { BalanceProps } from ".";
import { Balance } from ".";

export default {
  title: "Components/Balance",
  component: Balance,
} as Meta;

const Template: StoryFn<BalanceProps> = (args) => <Balance {...args} />;

export const Default = Template.bind({});
Default.args = {
  balance: 5000,
  bet: 0,
  win: 0,
};
