import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("should merge class names correctly", () => {
    const result = cn("foo", "bar", { baz: true }, ["qux", "quux"]);
    expect(result).toBe("foo bar baz qux quux");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
