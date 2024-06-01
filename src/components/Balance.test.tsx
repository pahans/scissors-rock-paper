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

  test("renders Balance component with default props", () => {
    setup();

    expect(screen.getByText("BALANCE: 5000")).toBeInTheDocument();
    expect(screen.getByText("BET: 1000")).toBeInTheDocument();
    expect(screen.getByText("WIN: 1500")).toBeInTheDocument();
  });

  test("renders Balance component with custom props", () => {
    setup({ balance: 3000, bet: 500, win: 1000 });

    expect(screen.getByText("BALANCE: 3000")).toBeInTheDocument();
    expect(screen.getByText("BET: 500")).toBeInTheDocument();
    expect(screen.getByText("WIN: 1000")).toBeInTheDocument();
  });
});
