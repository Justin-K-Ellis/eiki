import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { BadgeCheckIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface AnswerFeedbackProps {
  correct: boolean;
}

export default function AnswerFeedback({ correct }: AnswerFeedbackProps) {
  const t = useTranslations("AnswerFeedback");

  const message = correct ? t("correctMsg") : t("incorrectMsg");
  const color = correct ? "text-green-600" : "text-red-500";

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{t("answerTag")}</ItemTitle>
        <ItemDescription className={`${color} flex gap-2 items-center`}>
          {correct ? <BadgeCheckIcon /> : <X />}
          {message}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
