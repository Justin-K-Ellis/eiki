import { expect, it, describe, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";

import { NextIntlClientProvider } from "next-intl";
import Home from "@/app/[locale]/page";
import enMessages from "../../../messages/en.json";
import jaMessages from "../../../messages/ja.json";

vi.mock("@/components/ItemListContainer", () => ({
  default: () => <div />,
}));

describe("the Home page", () => {
  afterEach(() => {
    cleanup();
  });

  describe("English version", () => {
    it("displays the welcome text", () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <Home />
        </NextIntlClientProvider>
      );
      const text = "Welcome to the home page";
      const title = screen.getByRole("heading", { level: 1 }).textContent;
      expect(title).toMatch(text);
    });
  });

  describe("Japanese version", () => {
    it("displays the welcome text", () => {
      render(
        <NextIntlClientProvider locale="ja" messages={jaMessages}>
          <Home />
        </NextIntlClientProvider>
      );
      const text = "ホームページへようこそ";
      const title = screen.getByRole("heading", { level: 1 }).textContent;
      expect(title).toMatch(text);
    });
  });
});
