import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  type: text("type").notNull(), // 'buyer' or 'seller'
  timeline: text("timeline"),
  city: text("city"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Newsletter signups
export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  source: text("source"), // where signup came from (footer, home, etc)
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Blog post type (for static content)
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'first-time-buyers' | 'selling' | 'financing' | 'market-basics' | 'inspections';
  content: string;
  publishedAt: string;
}

// Education module type
export interface EducationModule {
  slug: string;
  title: string;
  description: string;
  hub: 'buyer' | 'seller';
  content: string;
  order: number;
}

// Neighborhood type
export interface Neighborhood {
  slug: string;
  name: string;
  county: 'alameda' | 'contra-costa';
  overview: string;
  housingStock: string;
  lifestyle: string;
  whoItFits: string;
}
