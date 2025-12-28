import {
  pgTable,
  integer,
  timestamp,
  text,
  real,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

// === Basic tables ===
export const usersTable = pgTable("users", {
  id: integer().primaryKey().notNull(),
  created_at: timestamp(),
});

export const passagesTable = pgTable("passages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  body: text().notNull().unique(),
  readability_score: real().notNull(),
  created_at: timestamp(),
  ja_translation: text().notNull().unique(),
  explanation: text().notNull(),
  //   answer_key_id
  //   CERF_level_id
  //   unit_id
});

export const optionsTable = pgTable("options", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull().unique(),
  //   passage_id
});

export const unitsTable = pgTable("units", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }),
  // CEFR_level_id
});

export const cefrTable = pgTable("cefr_levels", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }),
});

export const vocabTable = pgTable("vocab", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 256 }),
  // cefr
  added_at: timestamp(),
});

// === Join tables ===
export const userPassageAttemptsTable = pgTable("user_passage_attempts", {
  // user_id:
  // passage_id:
  correctly_answered: boolean().default(false),
  last_attempted_at: timestamp(),
  total_attempts: integer().default(0),
});

export const userVocabTable = pgTable("user_vocab", {
  // user_id
  // vocab_id
  review_score: varchar({ length: 256 }),
  last_reviewed_at: timestamp(),
});
