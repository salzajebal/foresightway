import { check, integer, jsonb, pgTable, real, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type PerformanceBondHolding = {
  bondName: string;
  duration: number;
  weight: number;
};

export const performanceBondsTable = pgTable("performance_bonds", {
  id: integer("id").primaryKey().default(1),
  holdings: jsonb("holdings").$type<PerformanceBondHolding[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}, (table) => [
  check(
    "performance_bonds_singleton_and_holding_count",
    sql`${table.id} = 1 AND jsonb_array_length(${table.holdings}) = 10`,
  ),
]);

export const insertPerformanceBondsSchema = createInsertSchema(performanceBondsTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertPerformanceBonds = z.infer<typeof insertPerformanceBondsSchema>;
export type PerformanceBonds = typeof performanceBondsTable.$inferSelect;