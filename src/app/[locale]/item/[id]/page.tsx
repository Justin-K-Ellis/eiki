import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import itemService from "@/services/Items.service";
import ItemCard from "@/components/ItemCard";
import ItemLoadingCard from "@/components/ItemLoadingCard";
import type { ItemCardTranslations } from "@/types/types";

export default async function AnItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId: number = parseInt(id);
  if (isNaN(itemId)) {
    notFound();
  }

  const item = itemService.getItem(itemId).catch(() => notFound());

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
    errorMsg: t("errorMsg"),
  };

  return (
    <div>
      <Suspense fallback={<ItemLoadingCard />}>
        <ItemCard item={item} translations={itemCardTranslations} />
      </Suspense>
    </div>
  );
}
