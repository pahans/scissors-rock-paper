import * as React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-b from-gray-600 to-gray-900">
        <Story />
      </div>
    ),
  ]
};

export default preview;
