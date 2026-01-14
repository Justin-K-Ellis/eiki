import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { BadgeCheckIcon, X } from "lucide-react";

interface AnswerFeedbackProps {
  correct: boolean;
}

export default function AnswerFeedback({ correct }: AnswerFeedbackProps) {
  const message = correct ? `Correct!` : `Incorrect`;
  const color = correct ? "text-green-500" : "text-red-500";

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Answer</ItemTitle>
        <ItemDescription className={`${color} flex gap-2`}>
          {/* <p className={color}> */}
          {correct ? <BadgeCheckIcon /> : <X />}
          {message}
          {/* </p> */}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
