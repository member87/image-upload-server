ALTER TABLE "images" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "updated_at" SET NOT NULL;