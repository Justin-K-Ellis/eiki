import type { Locale } from "@/types/types";

export default function castLocale(locale: string): Locale {
  if (locale !== "en" && locale !== "ja") {
    throw new Error("Unknown locale.");
  }
  return locale;
}
