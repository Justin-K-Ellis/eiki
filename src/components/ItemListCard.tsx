import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cefrDictionary from "@/lib/cefrDictionary";
import { CEFRLevel } from "@/db/schema";

interface ItemListCardProps {
  titleText: string;
  cefrLevel: CEFRLevel;
}

export default function ItemListCard(props: ItemListCardProps) {
  const description = cefrDictionary["en"][props.cefrLevel];

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
