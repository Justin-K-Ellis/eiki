import itemService from "@/services/Items.service";
import ItemCard from "@/components/ItemCard";

export default async function AnItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await itemService.getItem(parseInt(id));
  console.log(item);

  return (
    <div>
      <ItemCard
        title={item.passage.title}
        body={item.passage.body}
        options={item.options}
        japaneseTranslation={item.passage.ja_translation}
      />
    </div>
  );
}
