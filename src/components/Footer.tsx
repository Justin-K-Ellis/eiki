import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const d = new Date();
  return (
    <footer
      className="flex justify-center items-center shadow p-6 md:p-12"
      id="footer"
      hidden
    >
      <p>
        &copy; {d.getFullYear()} {t("name")}
      </p>
    </footer>
  );
}
