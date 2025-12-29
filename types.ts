import type { CEFRLevel } from "./src/db/schema";

export interface ItemContent {
  body: string;
  ja_translation: string;
  cefr_level: CEFRLevel;
  unit_id: number;
  key: string;
  distractors: string[];
}
