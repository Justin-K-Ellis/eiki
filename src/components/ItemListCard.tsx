import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "next-intl";
import cefrDictionary from "@/lib/cefrDictionary";
import { CEFRLevel } from "@/db/schema";
import type { Locale } from "@/types/types";

interface ItemListCardProps {
  titleText: string;
  cefrLevel: CEFRLevel;
}

export default function ItemListCard(props: ItemListCardProps) {
  const locale: Locale = useLocale() === "en" ? "en" : "ja";
  const description = cefrDictionary[locale][props.cefrLevel];

  return (
    <Card className="hover:shadow-accent">
      <CardHeader>
        <CardTitle>{props.titleText}</CardTitle>
        <CardDescription>
          <div className="flex gap-1">
            <p>{props.cefrLevel}</p>
            <p>-</p>
            <p>{description}</p>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
