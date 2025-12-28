import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

// === Basic tables ===
export const usersTable = pgTable("users", {
  id: integer().primaryKey().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export const passagesTable = pgTable("passages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  body: text().notNull().unique(),
  readability_score: real().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  ja_translation: text().notNull().unique(),
  explanation: text().notNull(),
  cerf_level_id: integer()
    .references(() => cefrTable.id)
    .notNull(),
  unit_id: integer()
    .references(() => unitsTable.id)
    .notNull(),
});

export const optionsTable = pgTable("options", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull().unique(),
  is_answer_key: boolean().notNull(),
  passage_id: integer()
    .references(() => passagesTable.id)
    .notNull(),
});

export const unitsTable = pgTable("units", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  cefr_level_id: integer()
    .references(() => cefrTable.id)
    .notNull(),
});

export const cefrTable = pgTable("cefr_levels", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
});

export const vocabTable = pgTable("vocab", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 256 }).notNull(),
  added_at: timestamp().defaultNow().notNull(),
});

// === Join tables ===
export const userPassageAttemptsTable = pgTable("user_passage_attempts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().references(() => usersTable.id),
  passage_id: integer().references(() => passagesTable.id),
  correctly_answered: boolean().default(false),
  last_attempted_at: timestamp(),
  total_attempts: integer().default(0),
});

export const userVocabTable = pgTable("user_vocab", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().references(() => usersTable.id),
  vocab_id: integer().references(() => vocabTable.id),
  review_score: varchar({ length: 256 }),
  last_reviewed_at: timestamp(),
});

// Types
export type User = InferSelectModel<typeof usersTable>;
export type Passage = InferSelectModel<typeof passagesTable>;
export type Option = InferSelectModel<typeof optionsTable>;
export type Vocab = InferSelectModel<typeof vocabTable>;
export type Unit = InferSelectModel<typeof unitsTable>;
export type CEFRLevel = InferSelectModel<typeof cefrTable>;
