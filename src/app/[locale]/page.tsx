import { useTranslations } from "next-intl";
import ItemListContainer from "@/components/ItemListContainer";
import type { LevelData } from "@/types/types";
import { cefrEnum } from "@/db/schema";

export default function Home() {
  const t = useTranslations("Home");

  const levelData: LevelData[] = cefrEnum.enumValues.map((level, index) => {
    return {
      level: level,
      unit: index + 1,
    };
  });

  return (
    <>
      <h1>{t("title")}</h1>
      {levelData.map((data) => (
        <ItemListContainer
          cefrLevel={data.level}
          unit={data.unit}
          key={data.unit}
        />
      ))}
    </>
  );
}
