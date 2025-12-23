import { useTranslations } from "next-intl";
import Title from "@/components/Title";

export default function About() {
  const t = useTranslations("About");
  return (
    <section>
      <Title text={t("title")} />
      <p>{t("content")}</p>
    </section>
  );
}
