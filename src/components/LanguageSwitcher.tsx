"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      value={locale}
      onChange={(e) => router.push(pathname, { locale: e.target.value })}
    >
      <option value="en">🇺🇸</option>
      <option value="ja">🇯🇵</option>
    </select>
  );
}
