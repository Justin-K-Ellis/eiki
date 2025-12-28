import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
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
  cerf_level_id: integer().references(() => cefrTable.id),
  unit_id: integer().references(() => unitsTable.id),
});

export const optionsTable = pgTable("options", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull().unique(),
  is_answer_key: boolean().notNull(),
  passage_id: integer().references(() => passagesTable.id),
});

export const unitsTable = pgTable("units", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }),
  cefr_level_id: integer().references(() => cefrTable.id),
});

export const cefrTable = pgTable("cefr_levels", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }),
});

export const vocabTable = pgTable("vocab", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 256 }),
  added_at: timestamp(),
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
