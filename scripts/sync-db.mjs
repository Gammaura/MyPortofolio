import { neon } from "@neondatabase/serverless";
import fs from "fs";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set in .env.local");
  process.exit(1);
}

const sql = neon(dbUrl);
const rawData = fs.readFileSync("src/data/cv-data.json", "utf-8");
const data = JSON.parse(rawData);

async function sync() {
  console.log("Syncing cv-data.json to Neon DB...");
  await sql`
    CREATE TABLE IF NOT EXISTS cv_data (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL
    )
  `;
  await sql`
    INSERT INTO cv_data (id, data) VALUES (1, ${JSON.stringify(data)})
    ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(data)}
  `;
  console.log("Successfully synced " + data.projects.length + " projects to Neon DB!");
}

sync().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
