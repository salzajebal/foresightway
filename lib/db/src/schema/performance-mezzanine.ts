import { check, integer, jsonb, pgTable, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export type PerformanceMezzanineHolding = {
  company: string;
  type: string;
  investmentPeriod: string;
  exitPeriod: string;
  returnRate: string;
};

export const performanceMezzanineTable = pgTable("performance_mezzanine", {
  id: integer("id").primaryKey().default(1),
  holdings: jsonb("holdings").$type<PerformanceMezzanineHolding[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
}, (table) => [
  check(
    "performance_mezzanine_singleton_and_holding_count",
    sql`${table.id} = 1
      AND jsonb_array_length(${table.holdings}) = 5`,
  ),
]);

export const insertPerformanceMezzanineSchema = createInsertSchema(performanceMezzanineTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertPerformanceMezzanine = z.infer<typeof insertPerformanceMezzanineSchema>;
export type PerformanceMezzanine = typeof performanceMezzanineTable.$inferSelect;