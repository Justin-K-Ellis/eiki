ALTER TABLE "user_vocab" DROP CONSTRAINT "user_vocab_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_vocab" ADD CONSTRAINT "user_vocab_user_id_vocab_id_unique" UNIQUE("user_id","vocab_id");