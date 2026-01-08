"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Option } from "@/db/schema";

interface ItemCardProps {
  title: string;
  body: string;
  options: Option[];
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <section id="item-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>{props.title}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-justify">{props.body}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <p className="font-bold">What is this passage mainly about?</p>
          <RadioGroup defaultValue="option-one">
            {props.options.map((option, index) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.text}
                  id={`option-${index + 1}`}
                />
                <Label htmlFor={`option-${index + 1}`}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
          <CardAction className="flex justify-center w-full">
            <Button type="submit">Answer</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </section>
  );
}
