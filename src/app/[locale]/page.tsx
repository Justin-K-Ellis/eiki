import { useTranslations } from "next-intl";
import ItemListContainer from "@/components/ItemListContainer";
import type { LevelData } from "@/types/types";

export default function Home() {
  const t = useTranslations("Home");
  const levelData: LevelData[] = [
    {
      level: "A1",
      unit: 1,
    },
    {
      level: "A2",
      unit: 2,
    },
    {
      level: "B1",
      unit: 3,
    },
    {
      level: "B2",
      unit: 4,
    },
    {
      level: "C1",
      unit: 5,
    },
    {
      level: "C2",
      unit: 6,
    },
  ];

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
