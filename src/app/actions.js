"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

const sql = neon(process.env.DATABASE_URL);

// Bikin tabel kalau belum ada
async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS cv_data (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL
    )
  `;
}

export async function getCVData() {
  try {
    await initDB();
    const rows = await sql`SELECT data FROM cv_data WHERE id = 1`;
    return rows[0]?.data || getDefaultCV();
  } catch (error) {
    console.error("Error reading CV data:", error);
    return getDefaultCV();
  }
}

export async function updateCVData(newData) {
  if (!newData.profile || !newData.skills || !newData.organizations || !newData.projects) {
    throw new Error("Invalid CV data structure");
  }
  await initDB();
  await sql`
    INSERT INTO cv_data (id, data) VALUES (1, ${JSON.stringify(newData)})
    ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(newData)}
  `;
  revalidatePath("/");
  revalidatePath("/admin");
}

function getDefaultCV() {
  return {
    profile: { name: "", title: "", email: "", phone: "", location: "", about: "", linkedin: "", github: "" },
    skills: [],
    organizations: [],
    projects: []
  };
}