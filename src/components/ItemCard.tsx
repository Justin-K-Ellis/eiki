"use client";

import { FormEvent, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
  japaneseTranslation: string;
}

export default function ItemCard(props: ItemCardProps) {
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [answer, setAnswer] = useState(0);

  function handleAnswering(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setQuestionAnswered(!questionAnswered);
  }

  if (!questionAnswered)
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
            <form
              onSubmit={(e) => handleAnswering(e)}
              className="flex flex-col gap-2 w-full"
              id="item-form"
            >
              <RadioGroup required>
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
            </form>
          </CardFooter>
        </Card>
      </section>
    );

  if (questionAnswered)
    return (
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>Explanation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="underline">English Passage</p>
            <p className="text-justify">{props.body}</p>
            <p className="underline">Japanese Translation</p>
            <p className="text-justify">{props.japaneseTranslation}</p>
          </div>
        </CardContent>
        <CardFooter>
          <CardAction>
            <form onSubmit={(e) => handleAnswering(e)}>
              <Button type="submit">Back</Button>
            </form>
          </CardAction>
        </CardFooter>
      </Card>
    );
}
