import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "next-intl";
import cefrDictionary from "@/lib/cefrDictionary";
import type { Locale } from "@/types/types";

interface ItemListCardProps {
  id: number;
  titleText: string;
  correctlyAnswered: boolean | null;
  totalAttempts: number | null;
}

export default function ItemListCard(props: ItemListCardProps) {
  // console.log(props);

  const locale: Locale = useLocale() === "en" ? "en" : "ja";
  const progressMessage = () => {
    if (props.correctlyAnswered) {
      return "Done!";
    } else if (props.totalAttempts === 0 || props.totalAttempts === null) {
      return "Not attempted";
    } else {
      return "Try again!";
    }
  };

  return (
    <Link href={`./item/${props.id}`}>
      <Card className="hover:shadow-accent">
        <CardHeader>
          <CardTitle>{props.titleText}</CardTitle>
          <CardDescription>
            <div className="flex gap-1">
              <p>{progressMessage()}</p>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
