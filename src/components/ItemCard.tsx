"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { scoreAnswer } from "@/lib/actions";

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

import LoadingCard from "./LoadingCard";
import AnswerFeedback from "./AnswerFeedback";
import { Option } from "@/db/schema";

interface ItemCardProps {
  title: string;
  body: string;
  passageId: number;
  options: Option[];
  japaneseTranslation: string;
  promptLabel: string;
  ansBtnLabel: string;
  isAnsLabel: string;
  explanationLabel: string;
  enPassLabel: string;
  jaPassLabel: string;
  backBtnLabel: string;
  scoringNow: string;
}

export default function ItemCard(props: ItemCardProps) {
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [answerId, setAnswerId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(false);
  const [answerKey] = props.options.filter((option) => option.is_answer_key);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    const scoreEvaluation = await scoreAnswer(answerId, props.passageId);
    setIsCorrect(scoreEvaluation);
    setLoading(false);
    setQuestionAnswered(!questionAnswered);
  }

  if (loading) return <LoadingCard text={props.scoringNow} />;

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
            <p className="font-bold">{props.promptLabel}</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
              id="item-form"
            >
              <RadioGroup
                required
                name="option-id"
                onValueChange={(value) => setAnswerId(parseInt(value))}
              >
                {props.options.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.id.toString()}
                      id={`option-${index + 1}`}
                    />
                    <Label htmlFor={`option-${index + 1}`}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
              <CardAction className="flex justify-center w-full">
                <Button type="submit">{props.ansBtnLabel}</Button>
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
          <CardDescription>{props.explanationLabel}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <AnswerFeedback correct={isCorrect!} />
            <p className="font-bold">
              {props.isAnsLabel}: {answerKey.text}
            </p>
            <p className="underline">{props.enPassLabel}</p>
            <p className="text-justify">{props.body}</p>
            <p className="underline">{props.jaPassLabel}</p>
            <p className="text-justify">{props.japaneseTranslation}</p>
          </div>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button type="button">
              <Link href={"/"}>{props.backBtnLabel}</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    );
}
