ALTER TABLE "images" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "updated_at" SET DEFAULT now();