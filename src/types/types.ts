import type {
  CEFRLevel,
  Passage,
  Option,
  UserPassageAttempts,
} from "../db/schema";

// Data types
export interface ItemContent {
  title: string;
  body: string;
  ja_translation: string;
  cefr_level: CEFRLevel;
  unit: number;
  key: string;
  distractors: string[];
}

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
  scoreAnswer: (passageId: number, optionId: number) => Promise<boolean | null>;
  getUserItemProgress: (passageId: number) => Promise<{
    correctlyAnswered: boolean | null;
    totalAttempts: number | null;
  }>;
}

export interface UsersServiceInterface {
  updatePassageAttempts: (
    userId: string,
    passageId: number,
    correctlyAnswered: boolean,
  ) => Promise<UserPassageAttempts>;
}
