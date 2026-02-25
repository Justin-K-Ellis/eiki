import * as z from "zod";
import type {
  CEFRLevel,
  Passage,
  Option,
  UserPassageAttempts,
} from "../db/schema";

// zod schema
export const ItemContentSchema = z.object({
  title: z.string(),
  body: z.string(),
  ja_translation: z.string(),
  cefr_level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  unit: z.number(),
  key: z.string(),
  distractors: z.array(z.string()),
});

// Data types
export type ItemContent = z.infer<typeof ItemContentSchema>;

export interface ItemInterface {
  passage: Passage;
  options: Option[];
}

export interface LevelData {
  level: CEFRLevel;
  unit: number;
}

export type Locale = "en" | "ja";

export interface TitleData {
  id: number;
  title: string;
}

export interface UserItemProgress extends TitleData {
  correctlyAnswered: boolean | null;
  totalAttempts: number | null;
}

// Class interfaces
export interface ItemsServiceInterface {
  getItemList: (unitIdentifier: number) => Promise<UserItemProgress[]>;
  getItem: (id: number) => Promise<ItemInterface>;
  scoreAnswer: (passageId: number, optionId: number) => Promise<boolean>;
}

export interface UsersServiceInterface {
  updatePassageAttempts: (
    userId: string,
    passageId: number,
    correctlyAnswered: boolean,
  ) => Promise<UserPassageAttempts>;
}
