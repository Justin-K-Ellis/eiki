import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorCard({ text }: { text: string }) {
  const t = useTranslations("ErrorCard");
  const title = t("title");
  const description = t("description");
  const footer = t("footer");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-500">{title}</CardTitle>
        <CardDescription className="text-red-800">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{text}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
}
