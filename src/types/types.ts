import type { CEFRLevel } from "../db/schema";

export interface ItemContent {
  body: string;
  ja_translation: string;
  cefr_level: CEFRLevel;
  unit: number;
  key: string;
  distractors: string[];
}
