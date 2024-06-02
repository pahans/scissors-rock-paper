import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from ".";

export default {
  title: "Components/Button",
  component: Button,
  parameters: { actions: { argTypesRegex: "^on.*" } },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const ClearButton = Template.bind({});
ClearButton.args = {
  children: "CLEAR",
};
