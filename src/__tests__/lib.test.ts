import { describe, it, expect } from "vitest";
import castLocale from "@/lib/castLocale";
import getRoundedNum from "@/lib/getRoundedNum";

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

describe("getRoundedNum", () => {
  it("should convert 1/3 to 33", () => {
    const result = getRoundedNum(1, 3);
    expect(result).toBe(33);
  });

  it("should convery 1/6 to 17", () => {
    const result = getRoundedNum(1, 6);
    expect(result).toBe(17);
  });

  it("should convery 3/6 to 50", () => {
    const result = getRoundedNum(3, 6);
    expect(result).toBe(50);
  });

  it("should convery 6/6 to 100", () => {
    const result = getRoundedNum(6, 6);
    expect(result).toBe(100);
  });

  it("should convery 0/0 to 0", () => {
    const result = getRoundedNum(0, 0);
    expect(result).toBe(0);
  });
});
