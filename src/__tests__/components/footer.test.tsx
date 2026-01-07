import { expect, it, describe, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";

import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import enMessages from "../../../messages/en.json";
import jaMessages from "../../../messages/ja.json";

describe("the footer", () => {
  afterEach(() => {
    cleanup();
  });

  describe("stub", () => {
    it("true is true", () => {
      expect(true).toBe(true);
    });
  });

  // describe("English version", () => {
  //   it("includes the copyright symbol, current year, and author name", () => {
  //     render(
  //       <NextIntlClientProvider locale="en" messages={enMessages}>
  //         <Footer />
  //       </NextIntlClientProvider>
  //     );
  //     const footer = screen.getByRole("paragraph");

  //     const cr = "©";
  //     const currentYear = new Date().getFullYear().toString();
  //     const name = "Justin Klitgaard";

  //     expect(footer.textContent).toContain(cr);
  //     expect(footer.textContent).toContain(name);
  //     expect(footer.textContent).toContain(currentYear);
  //   });
  // });

  // describe("Japanese version", () => {
  //   it("includes the copyright symbol, current year, and author name", () => {
  //     render(
  //       <NextIntlClientProvider locale="ja" messages={jaMessages}>
  //         <Footer />
  //       </NextIntlClientProvider>
  //     );
  //     const footer = screen.getByRole("paragraph");

  //     const cr = "©";
  //     const currentYear = new Date().getFullYear().toString();
  //     const name = "クリトガード・ジャスティン";

  //     expect(footer.textContent).toContain(cr);
  //     expect(footer.textContent).toContain(name);
  //     expect(footer.textContent).toContain(currentYear);
  //   });
  // });
});
