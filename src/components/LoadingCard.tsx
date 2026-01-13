import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

interface LoadingCardProps {
  text: string;
}

export default function LoadingCard({ text }: LoadingCardProps) {
  return (
    <div className="w-1/2 flex justify-center items-center">
      <Item variant="outline">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{text}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
