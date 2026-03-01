import { getTranslations } from "next-intl/server";
import ItemHeader from "./ItemHeader";
import ItemListCard from "./ItemListCard";
import { CEFRLevel } from "@/db/schema";
import itemService from "@/services/Items.service";
import { getLocale } from "next-intl/server";
import castLocale from "@/lib/castLocale";

interface ItemListContainerProps {
  cefrLevel: CEFRLevel;
  unit: number;
}

export default async function ItemListContainer(props: ItemListContainerProps) {
  const [t, titleData] = await Promise.all([
    getTranslations("ItemListContainer"),
    itemService.getItemList(props.unit),
  ]);
  const locale = castLocale(await getLocale());

  if (titleData.length === 0)
    return (
      <>
        <ItemHeader cefrLevel={props.cefrLevel} locale={locale} />
        <p>{t("coming-soon")}</p>
      </>
    );

  return (
    <section className="mb-4 md:mb-6">
      <ItemHeader cefrLevel={props.cefrLevel} locale={locale} />
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
