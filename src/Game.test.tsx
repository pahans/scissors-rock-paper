import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { GameProvider } from "./context";
import Game from "./Game";

describe("Game", () => {
  const setup = () =>
    render(
      <GameProvider>
        <Game />
      </GameProvider>,
    );

  test("displays the correct bet options", () => {
    setup();
    const gameChoices = screen.getAllByTestId("bet-option");
    expect(gameChoices.length).toBe(3);
  });
});
