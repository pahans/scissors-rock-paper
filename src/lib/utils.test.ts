import { describe, expect, test } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  test("should merge class names correctly", () => {
    const result = cn("foo", "bar", { baz: true }, ["qux", "quux"]);
    expect(result).toBe("foo bar baz qux quux");
  });

  test("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
