import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Balance, BalanceProps } from "./Balance";

describe("Balance Component", () => {
  const setup = (props: Partial<BalanceProps> = {}) => {
    const defaultProps: BalanceProps = {
      balance: 5000,
      bet: 1000,
      win: 1500,
    };
    return render(<Balance {...defaultProps} {...props} />);
  };

  test("renders Balance component with props", () => {
    setup();

    expect(screen.getByText("BALANCE:")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
    expect(screen.getByText("BET:")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("WIN:")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();
  });
});
