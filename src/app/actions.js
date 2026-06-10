"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import seedCV from "@/data/cv-data.json";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

// Bikin tabel kalau belum ada
async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS cv_data (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL
    )
  `;
}

function getDefaultCV() {
  return {
    profile: { name: "", title: "", email: "", phone: "", location: "", about: "", linkedin: "", github: "" },
    skills: [],
    certificates: [],
    organizations: [],
    projects: [],
    timeline: [],
  };
}

function normalizeCVData(data) {
  const defaults = getDefaultCV();
  return {
    ...defaults,
    ...data,
    profile: { ...defaults.profile, ...data?.profile },
    skills: data?.skills ?? [],
    certificates: data?.certificates ?? [],
    organizations: data?.organizations ?? [],
    projects: data?.projects ?? [],
    timeline: data?.timeline ?? [],
  };
}

function getSeedCV() {
  return normalizeCVData(seedCV);
}

function shouldUseSeed(data) {
  if (!data) return true;
  const normalized = normalizeCVData(data);
  const hasProfile = Boolean(normalized.profile?.name?.trim());
  const hasContent =
    normalized.projects.length > 0 ||
    normalized.organizations.length > 0 ||
    normalized.skills.length > 0 ||
    normalized.timeline.length > 0;

  if (!hasProfile && !hasContent) return true;

  // DB terisi sebagian tapi portfolio kosong
  if (
    normalized.projects.length === 0 &&
    normalized.organizations.length === 0 &&
    normalized.timeline.length === 0
  ) {
    return true;
  }

  return false;
}

export async function getCVData() {
  const seed = getSeedCV();

  if (!sql) {
    return seed;
  }

  try {
    await initDB();
    const rows = await sql`SELECT data FROM cv_data WHERE id = 1`;
    if (!rows[0]?.data || shouldUseSeed(rows[0].data)) {
      return seed;
    }
    return normalizeCVData(rows[0].data);
  } catch (error) {
    console.error("Error reading CV data:", error);
    return seed;
  }
}

export async function updateCVData(newData) {
  if (!newData.profile || !newData.skills || !newData.organizations || !newData.projects) {
    throw new Error("Invalid CV data structure");
  }
  const payload = normalizeCVData(newData);
  await initDB();
  await sql`
    INSERT INTO cv_data (id, data) VALUES (1, ${JSON.stringify(payload)})
    ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(payload)}
  `;
  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/projects");
  revalidatePath("/organizations");
  revalidatePath("/contact");
  revalidatePath("/admin");
  return { success: true };
}
