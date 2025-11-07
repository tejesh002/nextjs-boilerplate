import { describe, expect, it } from "vitest";
import { formatDate } from "../utils/formatDate";

describe("formatDate", () => {
  it("formats a date string", () => {
    expect(formatDate("2024-01-01")).toContain("2024");
  });
});


