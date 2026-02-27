"use client";

import { FormEvent, useState, use } from "react";
import { Link } from "@/i18n/navigation";

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
import ErrorCard from "./ErrorCard";
import AnswerFeedback from "./AnswerFeedback";
import { scoreAnswer } from "@/lib/actions";
import type { ItemInterface, ItemCardTranslations } from "@/types/types";

interface ItemCardProps {
  item: Promise<ItemInterface>;
  translations: ItemCardTranslations;
}

export default function ItemCard(props: ItemCardProps) {
  const item = use(props.item);

  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [answerId, setAnswerId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [answerKey] = item.options.filter((option) => option.is_answer_key);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true);
      const scoreEvaluation = await scoreAnswer(item.passage.id, answerId);
      setIsCorrect(scoreEvaluation);
      setQuestionAnswered(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (error)
    return (
      <div className="flex justify-center items-center">
        <ErrorCard text="Something went wrong when scoring." />
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <LoadingCard text={props.translations.scoringNow} />
      </div>
    );

  if (!questionAnswered)
    return (
      <section id="item-card">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1>{item.passage.title}</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-justify">{item.passage.body}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <p className="font-bold">{props.translations.promptLabel}</p>
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
                {item.options.map((option, index) => (
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
                <Button type="submit">{props.translations.ansBtnLabel}</Button>
              </CardAction>
            </form>
          </CardFooter>
        </Card>
      </section>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.passage.title}</CardTitle>
        <CardDescription>{props.translations.explanationLabel}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <AnswerFeedback correct={isCorrect} />
          <p className="font-bold">
            {props.translations.isAnsLabel}: {answerKey.text}
          </p>
          <p className="underline">{props.translations.enPassLabel}</p>
          <p className="text-justify">{item.passage.body}</p>
          <p className="underline">{props.translations.jaPassLabel}</p>
          <p className="text-justify">{item.passage.ja_translation}</p>
        </div>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button type="button">
            <Link href={"/"}>{props.translations.backBtnLabel}</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
