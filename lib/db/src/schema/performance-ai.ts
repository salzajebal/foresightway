import { check, integer, jsonb, pgTable, real, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type PerformanceAiMonth = {
  month: string;
  return: number;
};

export type PerformanceAiTrade = {
  stockName: string;
  tradeDetail: string;
  return: number;
};

export const performanceAiTable = pgTable("performance_ai", {
  id: integer("id").primaryKey().default(1),
  months: jsonb("months").$type<PerformanceAiMonth[]>().notNull(),
  recentTrades: jsonb("recent_trades").$type<PerformanceAiTrade[]>().notNull(),
  annualAverageReturn: real("annual_average_return").notNull(),
  annualAverageStockCount: integer("annual_average_stock_count").notNull(),
  annualWinRate: real("annual_win_rate").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}, (table) => [
  check(
    "performance_ai_singleton_and_month_count",
    sql`${table.id} = 1 AND jsonb_array_length(${table.months}) = 12`,
  ),
  check(
    "performance_ai_recent_trade_count",
    sql`jsonb_array_length(${table.recentTrades}) = 5`,
  ),
  check(
    "performance_ai_summary_ranges",
    sql`${table.annualAverageStockCount} > 0 AND ${table.annualWinRate} >= 0 AND ${table.annualWinRate} <= 100`,
  ),
]);

export const insertPerformanceAiSchema = createInsertSchema(performanceAiTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertPerformanceAi = z.infer<typeof insertPerformanceAiSchema>;
export type PerformanceAi = typeof performanceAiTable.$inferSelect;