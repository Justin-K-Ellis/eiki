ALTER TABLE "units" RENAME COLUMN "name" TO "en_name";--> statement-breakpoint
ALTER TABLE "units" ADD COLUMN "ja_name" varchar(256) NOT NULL;