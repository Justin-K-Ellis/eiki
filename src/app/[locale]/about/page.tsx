import { useTranslations } from "next-intl";
import Title from "@/components/Title";

export default function About() {
  const t = useTranslations("About");
  return (
    <section className="flex flex-col gap-3 text-justify mt-4">
      <div id="title-wrapper" className="md:mb-6">
        <Title text={t("title")} />
      </div>
      <p>{t("content1")}</p>
      <p>{t("content2")}</p>
    </section>
  );
}
