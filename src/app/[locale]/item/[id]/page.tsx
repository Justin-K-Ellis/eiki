import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import itemService from "@/services/Items.service";
import ItemCard from "@/components/ItemCard";
import type { ItemInterface, ItemCardTranslations } from "@/types/types";
import { Suspense } from "react";

export default async function AnItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: Promise<ItemInterface>;
  try {
    item = itemService.getItem(parseInt(id));
  } catch (error) {
    console.error(error);
    notFound();
  }
  const t = await getTranslations("ItemCard");
  const itemCardTranslations: ItemCardTranslations = {
    promptLabel: t("questionPrompt"),
    explanationLabel: t("explanation"),
    ansBtnLabel: t("answerBtn"),
    isAnsLabel: t("isAnswer"),
    enPassLabel: t("enPassageMarker"),
    jaPassLabel: t("jaPassageMarker"),
    backBtnLabel: t("backBtn"),
    scoringNow: t("scoringNow"),
  };

  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <ItemCard item={item} translations={itemCardTranslations} />
      </Suspense>
    </div>
  );
}
