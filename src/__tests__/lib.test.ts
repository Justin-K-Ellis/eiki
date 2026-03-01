import { describe, it, expect } from "vitest";
import castLocale from "@/lib/castLocale";

describe("castLocale", () => {
  it("returns Locale of 'en' when passed 'en' string", () => {
    const localeStr = "en";
    const result = castLocale(localeStr);
    expect(result).toBe("en");
  });

  it("returns Locale of 'ja' when passed 'ja' string", () => {
    const localeStr = "ja";
    const result = castLocale(localeStr);
    expect(result).toBe("ja");
  });

  it("throws an error when passed a string that's neither 'en' nor 'ja'", () => {
    const localeStr = "kr";
    expect(() => castLocale(localeStr)).toThrowError("Unknown locale.");
  });
});
