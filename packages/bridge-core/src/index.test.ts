import { describe, it, expect } from "vitest";
import { version } from "./index";

describe("bridge-core", () => {
  it("exports version", () => {
    expect(version).toBe("0.1.0");
  });
});
