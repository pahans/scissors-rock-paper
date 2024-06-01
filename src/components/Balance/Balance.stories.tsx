import { Meta, StoryFn } from "@storybook/react";
import { Balance, BalanceProps } from "./Balance";

export default {
  title: "Example/Balance",
  component: Balance,
} as Meta;

const Template: StoryFn<BalanceProps> = (args) => <Balance {...args} />;

export const Default = Template.bind({});
Default.args = {
  balance: 5000,
  bet: 0,
  win: 0,
};
