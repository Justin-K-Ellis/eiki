CREATE TYPE "public"."cefr_level" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2');--> statement-breakpoint
CREATE TABLE "options" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "options_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text NOT NULL,
	"is_answer_key" boolean NOT NULL,
	"passage_id" integer NOT NULL,
	CONSTRAINT "options_text_unique" UNIQUE("text")
);
--> statement-breakpoint
CREATE TABLE "passages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "passages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"body" text NOT NULL,
	"readability_score" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ja_translation" text NOT NULL,
	"cerf_level" "cefr_level" NOT NULL,
	"unit" integer NOT NULL,
	CONSTRAINT "passages_body_unique" UNIQUE("body"),
	CONSTRAINT "passages_ja_translation_unique" UNIQUE("ja_translation")
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "units_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"en_name" varchar(256) NOT NULL,
	"unit_identifier" integer NOT NULL,
	"ja_name" varchar(256) NOT NULL,
	"cefr_level" "cefr_level" NOT NULL,
	CONSTRAINT "units_en_name_unique" UNIQUE("en_name"),
	CONSTRAINT "units_unit_identifier_unique" UNIQUE("unit_identifier"),
	CONSTRAINT "units_ja_name_unique" UNIQUE("ja_name")
);
--> statement-breakpoint
CREATE TABLE "user_passage_attempts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_passage_attempts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer,
	"passage_id" integer,
	"correctly_answered" boolean DEFAULT false,
	"last_attempted_at" timestamp,
	"total_attempts" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "user_vocab" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_vocab_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer,
	"vocab_id" integer,
	"review_score" varchar(256),
	"last_reviewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vocab" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vocab_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" varchar(256) NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "options" ADD CONSTRAINT "options_passage_id_passages_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passages" ADD CONSTRAINT "passages_unit_units_unit_identifier_fk" FOREIGN KEY ("unit") REFERENCES "public"."units"("unit_identifier") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_passage_attempts" ADD CONSTRAINT "user_passage_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_passage_attempts" ADD CONSTRAINT "user_passage_attempts_passage_id_passages_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocab" ADD CONSTRAINT "user_vocab_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocab" ADD CONSTRAINT "user_vocab_vocab_id_vocab_id_fk" FOREIGN KEY ("vocab_id") REFERENCES "public"."vocab"("id") ON DELETE no action ON UPDATE no action;