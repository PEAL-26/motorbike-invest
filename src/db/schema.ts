import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export type INCOME_STATUS_TYPES = "PAID" | "PENDING";
export type INVESTMENT_STATUS_TYPES = "PENDING" | "ACTIVE" | "FINISHED";

export const income = sqliteTable("incomes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  investmentId: integer("investment_id", { mode: "number" }).notNull(),
  code: text("code").notNull(),
  number: integer("number").notNull(),
  income: real("income").notNull(),
  status: t
    .text("status")
    .$type<INCOME_STATUS_TYPES>()
    .default("PENDING")
    .notNull(),
  paymentDate: integer("payment_date", { mode: "timestamp" }),
  incomeDate: integer("income_date", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`,
  ),
});

export const investment = sqliteTable("investments", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: t.text("name").notNull(),
  amount: real("amount").notNull(),
  income: real("income").notNull(),
  profit: real("profit").notNull(),
  bonus: real("bonus"),
  duration: integer("duration").notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  status: t
    .text("status")
    .$type<INVESTMENT_STATUS_TYPES>()
    .default("PENDING")
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`,
  ),
});
