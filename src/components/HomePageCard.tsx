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
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>{props.content}</p>
          <CardAction>
            <Link href={props.link}>
              <Button>Go</Button>
            </Link>
          </CardAction>
        </div>
      </CardContent>
    </Card>
  );
}
