import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";

async function main() {
  const db = drizzle(
    createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN!,
    })
  );

  console.log("Running migrations");

  await migrate(db, {
    migrationsFolder: "./app/database/migrations",
  });

  console.log("Migrated successfully");

  process.exit(0);
}

main().catch((e) => {
  console.error("Migration failed");
  console.error(e);
  process.exit(1);
});
