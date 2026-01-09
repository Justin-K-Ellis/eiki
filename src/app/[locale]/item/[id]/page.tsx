import { getTranslations } from "next-intl/server";
import itemService from "@/services/Items.service";
import ItemCard from "@/components/ItemCard";

export default async function AnItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await itemService.getItem(parseInt(id));
  const t = await getTranslations("ItemCard");

  return (
    <div>
      <ItemCard
        title={item.passage.title}
        body={item.passage.body}
        options={item.options}
        japaneseTranslation={item.passage.ja_translation}
        promptLabel={t("questionPrompt")}
        explanationLabel={t("explanation")}
        ansBtnLabel={t("answerBtn")}
        isAnsLabel={t("isAnswer")}
        enPassLabel={t("enPassageMarker")}
        jaPassLabel={t("jaPassageMarker")}
        backBtnLabel={t("backBtn")}
      />
    </div>
  );
}
