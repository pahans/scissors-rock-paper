
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![codecov](https://codecov.io/gh/pahans/scissors-rock-paper/graph/badge.svg?token=SGVJDWAMAI)](https://codecov.io/gh/pahans/scissors-rock-paper)

## Getting Started

This project has been tested with Node.js version 20.
You can see this project live at [https://scissors-rock-paper.vercel.app/](https://scissors-rock-paper.vercel.app/).

0. **Install pnpm:**
  - Note that pnpm version 9.1.3 is being used.
  ```bash
  corepack enable
  corepack prepare pnpm@9.1.3 --activate
  pnpm install
  ```

1. **Install Dependencies:**
   - Run the following command to install the necessary dependencies:
   ```bash
   pnpm install
   ```

2. **Start the Development Server:**
   - Run the development server with:
   ```bash
   pnpm run dev
   ```

3. **Run Storybook (Optional):**
   - Start Storybook with:
   ```bash
   pnpm run storybook
   ```

4. **Run Tests:**
   - Execute tests with:
   ```bash
   pnpm run test:ui
   ```

## Conventions
## Conventions
- **File Names**: File names should be in kebab-case, except for component and class files.
- **Components**: Separate components into presentational and container components.
- **Formatting**: Formatting guidelines (such as import order and double quotes) are enforced using ESLint.
- **Commit Messages**: Use [Commitizen](https://commitizen-tools.github.io/commitizen/) for structured commit messages. 

## Technology Stack
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **Vitest**: For unit testing.
- **React Testing Library**: For testing React components.
- **React Storybook**: For developing and testing UI components in isolation.
- **Vite**: For fast and efficient development and build processes.
- **ESLint & Prettier**: For code linting and formatting.
- **GitHub Actions**: For continuous integration and deployment.
- **Codecov**: For code coverage reporting.

## Some Scenarios of Addressing Changing Requirements / Game Configurations

Configuration file: `src/config/game-config.ts`

- **Adding More Choices:**
  - Add new entries and define winning criteria under `gameChoicesConfig`, and update `winRates`.
  - Update `calculateResult` and its tests to accommodate new game logic.
  - The totalWinAmount accumulation is written to support multiple computer choices in the future.

- **Changing Starting Balance:**
  - Update the `startingBalance` value.

- **Change Return Rates:**
  - Update the `winRates` values.
