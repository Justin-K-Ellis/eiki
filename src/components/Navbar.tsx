import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import type { NavLinkData } from "@/types/types";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const linkData: NavLinkData[] = [
    {
      text: t("dashboard"),
      url: "/dashboard",
    },
    {
      text: t("about"),
      url: "/about",
    },
  ];

  return (
    <nav className="flex justify-between items-center shadow p-1 md:p-2 mb-4 md:mb-8">
      <Link href={"/"} className="font-bold text-3xl md:text-4xl">
        {t("title")}
      </Link>
      <ul className="flex gap-1 md:gap-3 items-center">
        {linkData.map((link) => (
          <li key={link.url}>
            <Button variant={"secondary"}>
              <Link href={link.url}>{link.text}</Link>
            </Button>
          </li>
        ))}
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
