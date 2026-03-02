import { useTranslations, useLocale } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemListContainer from "@/components/ItemListContainer";
import ItemHeader from "@/components/ItemHeader";
import type { LevelData } from "@/types/types";
import { cefrEnum } from "@/db/schema";
import castLocale from "@/lib/castLocale";

export default function Reading() {
  const t = useTranslations("Home");
  const locale = castLocale(useLocale());

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
        <article key={data.unit}>
          <Accordion type="single" collapsible>
            <AccordionItem value={data.level}>
              <AccordionTrigger>
                <ItemHeader cefrLevel={data.level} locale={locale} />
              </AccordionTrigger>
              <AccordionContent>
                <ItemListContainer
                  cefrLevel={data.level}
                  unit={data.unit}
                  key={data.unit}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <hr className="w-full" />
        </article>
      ))}
    </>
  );
}
