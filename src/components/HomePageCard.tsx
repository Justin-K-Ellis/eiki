import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

interface HPCardProps {
  title: string;
  description: string;
  content: string;
  link: string;
}

export default function HomePageCard(props: HPCardProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>{props.content}</p>
          <Link href={props.link} className="w-1/4">
            <Button className="w-full">Go</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
