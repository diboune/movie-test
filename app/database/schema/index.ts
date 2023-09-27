import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username", { length: 256 }).notNull().unique(),
  password: text("password", { length: 256 }).notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
});
