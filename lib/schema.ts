import { mysqlTable, int, text, varchar } from "drizzle-orm/mysql-core";

export const income = mysqlTable("income", {
  id: varchar("id", { length: 255 }).primaryKey(),
  amount: int("amount").notNull(),
  description: text("description").notNull(),
  created_at: varchar("created_at", { length: 25 }).notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
});

export const expense = mysqlTable("expense", {
  id: varchar("id", { length: 255 }).primaryKey(),
  amount: int("amount").notNull(),
  name: text("name").notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  created_at: varchar("created_at", { length: 25 }).notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
});
