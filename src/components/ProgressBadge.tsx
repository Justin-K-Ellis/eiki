import { Badge } from "./ui/badge";
import { BadgeCheckIcon, Triangle, Badge as LuicdeBadge } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProgressBadgeProps {
  progressStatus: "done" | "tryAgain" | "notAttempted";
}

export default function ProgressBadge({ progressStatus }: ProgressBadgeProps) {
  const t = useTranslations("ProgressBadges");

  const bgColorsDict = {
    done: "bg-green-500",
    tryAgain: "bg-amber-500",
    notAttempted: "bg-slate-500",
  };

  const iconDict = {
    done: <BadgeCheckIcon />,
    tryAgain: <Triangle />,
    notAttempted: <LuicdeBadge />,
  };

  return (
    <Badge className={bgColorsDict[progressStatus]}>
      {iconDict[progressStatus]}
      {t(progressStatus)}
    </Badge>
  );
}
