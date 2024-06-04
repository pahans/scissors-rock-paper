import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

import BetOption from "./BetOption";

describe("BetOption Component", () => {
  it("renders the component with the correct choice text", () => {
    render(<BetOption choice="rock" onSelect={vi.fn()} />);
    expect(screen.getByText("ROCK")).toBeInTheDocument();
  });

  it("displays the bet amount when it is greater than 0", () => {
    render(<BetOption choice="rock" onSelect={vi.fn()} betAmount={500} />);
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("hides the bet amount when it is 0", () => {
    render(<BetOption choice="rock" onSelect={vi.fn()} betAmount={0} />);
    const betAmountElement = screen.getByText("ROCK").previousElementSibling;
    expect(betAmountElement).toHaveClass("invisible");
  });

  it("calls onSelect with the correct choice when clicked", () => {
    const onSelectMock = vi.fn();
    render(<BetOption choice="rock" onSelect={onSelectMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSelectMock).toHaveBeenCalledWith("rock");
  });
});
