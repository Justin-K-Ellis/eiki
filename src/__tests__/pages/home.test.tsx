import { expect, it, describe, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";

import { NextIntlClientProvider } from "next-intl";
import Home from "@/app/[locale]/page";
import enMessages from "../../../messages/en.json";
import jaMessages from "../../../messages/ja.json";

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
      const title = screen.getByRole("heading").textContent;
      expect(title).toMatch("Welcome to the home page.");
    });
  });

  describe("Japanese version", () => {
    it("displays the welcome text", () => {
      render(
        <NextIntlClientProvider locale="ja" messages={jaMessages}>
          <Home />
        </NextIntlClientProvider>
      );
      const title = screen.getByRole("heading").textContent;
      expect(title).toMatch("ホームページへようこそ");
    });
  });
});
