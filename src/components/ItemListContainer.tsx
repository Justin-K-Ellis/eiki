import { getTranslations, getLocale } from "next-intl/server";
import { CEFRLevel } from "@/db/schema";
// import castLocale from "@/lib/castLocale";
// import ItemHeader from "./ItemHeader";
import ItemListCard from "./ItemListCard";
import itemService from "@/services/Items.service";

interface ItemListContainerProps {
  cefrLevel: CEFRLevel;
  unit: number;
}

export default async function ItemListContainer(props: ItemListContainerProps) {
  const [t, titleData] = await Promise.all([
    getTranslations("ItemListContainer"),
    itemService.getItemList(props.unit),
  ]);

  if (titleData.length === 0)
    return (
      <>
        <p>{t("coming-soon")}</p>
      </>
    );

  return (
    <section className="mb-4 md:mb-6">
      <ul className="list-none flex flex-col gap-2">
        {titleData.map((data) => (
          <li key={data.id}>
            <ItemListCard
              id={data.id}
              titleText={data.title}
              correctlyAnswered={data.correctlyAnswered}
              totalAttempts={data.totalAttempts}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
