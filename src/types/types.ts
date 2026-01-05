import type { CEFRLevel, Passage, Option } from "../db/schema";

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

export interface TitleData {
  id: number;
  title: string;
}

export interface ItemsServiceInterface {
  getItemList: (unitIdentifier: number) => Promise<TitleData[]>;
  getItem: (id: number) => Promise<ItemInterface>;
}
