import { check, integer, jsonb, pgTable, real, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type PerformanceIpoInvestment = {
  stockName: string;
  purchasePrice: string;
  purchasePeriod: string;
  listingDate: string;
  return: number;
};

export const performanceIpoTable = pgTable("performance_ipo", {
  id: integer("id").primaryKey().default(1),
  investments: jsonb("investments").$type<PerformanceIpoInvestment[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}, (table) => [
  check(
    "performance_ipo_singleton_and_investment_count",
    sql`${table.id} = 1 AND jsonb_array_length(${table.investments}) = 13`,
  ),
]);

export const insertPerformanceIpoSchema = createInsertSchema(performanceIpoTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertPerformanceIpo = z.infer<typeof insertPerformanceIpoSchema>;
export type PerformanceIpo = typeof performanceIpoTable.$inferSelect;