import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").notNull(),
  key: text("key").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
