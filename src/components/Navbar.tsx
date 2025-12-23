import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <nav className="flex justify-between items-center shadow p-1 md:p-2">
      <h1 className="font-bold text-3xl md:text-4xl">{t("title")}</h1>
      <ul className="flex gap-1 md:gap-2">
        <li>{t("login")}</li>
        <li>{t("about")}</li>
        <li>EN</li>
      </ul>
    </nav>
  );
}
