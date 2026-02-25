import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { UserButton } from "@clerk/nextjs";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <nav className="flex justify-between items-center shadow p-1 md:p-2 mb-4 md:mb-8">
      <Link href={"/"} className="font-bold text-3xl md:text-4xl">
        {t("title")}
      </Link>
      <ul className="flex gap-2 md:gap-3 items-center">
        <li>
          <UserButton />
        </li>
        <li>
          <Link href={"/about"}>{t("about")}</Link>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
