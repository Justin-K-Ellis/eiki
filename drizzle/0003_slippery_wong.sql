ALTER TABLE "user_passage_attempts" DROP CONSTRAINT "user_passage_attempts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_vocab" DROP CONSTRAINT "user_vocab_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_passage_attempts" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_vocab" ALTER COLUMN "user_id" SET DATA TYPE text;