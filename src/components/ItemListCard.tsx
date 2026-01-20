import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProgressBadge from "./ProgressBadge";

interface ItemListCardProps {
  id: number;
  titleText: string;
  correctlyAnswered: boolean | null;
  totalAttempts: number | null;
}

export default function ItemListCard(props: ItemListCardProps) {
  const progressMessage = () => {
    if (props.correctlyAnswered) {
      return <ProgressBadge progressStatus="done" />;
    } else if (props.totalAttempts === 0 || props.totalAttempts === null) {
      return <ProgressBadge progressStatus="notAttempted" />;
    } else {
      return <ProgressBadge progressStatus="tryAgain" />;
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
