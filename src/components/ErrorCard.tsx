import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorCard({ text }: { text: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-500">Uh-oh</CardTitle>
        <CardDescription className="text-red-800">
          Looks like something went wrong.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{text}</p>
      </CardContent>
      <CardFooter>
        <p>Please try again later.</p>
      </CardFooter>
    </Card>
  );
}
