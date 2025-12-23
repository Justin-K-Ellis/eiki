import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <nav className="flex justify-between items-center shadow p-1 md:p-2 mb-4 md:mb-8">
      <h1 className="font-bold text-3xl md:text-4xl">
        <Link href={"/"}>{t("title")}</Link>
      </h1>
      <ul className="flex gap-1 md:gap-2">
        <li>
          <Link href={"#"}>{t("login")}</Link>
        </li>
        <li>
          <Link href={"/about"}>{t("about")}</Link>
        </li>
        <li>EN</li>
      </ul>
    </nav>
  );
}
