import { useTranslations } from "next-intl";
import HomePageCard from "@/components/HomePageCard";

export default function Home() {
  const r = useTranslations("HomePageCardReading");
  const v = useTranslations("HomePageCardVocab");

  const rTitle = r("title");
  const rDescription = r("description");
  const rContent = r("content");

  const vTitle = v("title");
  const vDescription = v("description");
  const vContent = v("content");

  return (
    <section className="flex flex-col md:flex-row gap-4">
      <HomePageCard
        title={rTitle}
        description={rDescription}
        content={rContent}
        link="/reading"
      />
      <HomePageCard
        title={vTitle}
        description={vDescription}
        content={vContent}
        link="/vocab"
      />
    </section>
  );
}
