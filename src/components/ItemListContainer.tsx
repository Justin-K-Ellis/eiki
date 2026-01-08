import { getTranslations } from "next-intl/server";
import ItemHeader from "./ItemHeader";
import ItemListCard from "./ItemListCard";
import { CEFRLevel } from "@/db/schema";
import itemService from "@/services/Items.service";

interface ItemListContainerProps {
  cefrLevel: CEFRLevel;
  unit: number;
}

export default async function ItemListContainer(props: ItemListContainerProps) {
  const t = await getTranslations("ItemListContainer");
  const titleData = await itemService.getItemList(props.unit);

  if (titleData.length === 0)
    return (
      <>
        <ItemHeader text={props.cefrLevel} />
        <p>{t("coming-soon")}</p>
      </>
    );

  return (
    <section className="mb-4 md:mb-6">
      <ItemHeader text={props.cefrLevel} />
      <ul className="list-none flex flex-col gap-2">
        {titleData.map((data) => (
          <li key={data.id}>
            <ItemListCard
              titleText={data.title}
              cefrLevel={props.cefrLevel}
              id={data.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
