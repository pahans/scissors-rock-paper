/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";

import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup"],
    coverage: {
      exclude: [
        "**/*.stories.@(js|jsx|mjs|ts|tsx)",
        "**/*.config.@(js|jsx|mjs|ts|tsx)",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
