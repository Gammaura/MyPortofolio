"use server";

import fs from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import seedCV from "@/data/cv-data.json";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
let isDbTableReady = false;

// Pastikan tabel sudah ada (hanya dijalankan jika belum pernah diverifikasi)
async function ensureDBTable() {
  if (isDbTableReady || !sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cv_data (
        id INTEGER PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL
      )
    `;
    isDbTableReady = true;
  } catch (err) {
    console.warn("Neon DB table initialization check:", err.message);
  }
}

function getDefaultCV() {
  return {
    profile: { name: "", nickname: "Adjie", title: "", email: "", phone: "", location: "", about: "", avatar: "/assets/photo.png", linkedin: "", github: "" },
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

async function getLocalCVData() {
  try {
    const jsonPath = path.join(process.cwd(), "src/data/cv-data.json");
    const raw = await fs.readFile(jsonPath, "utf-8");
    return normalizeCVData(JSON.parse(raw));
  } catch {
    return normalizeCVData(seedCV);
  }
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
  const localData = await getLocalCVData();

  // 1. Coba ambil dari Supabase Multi-Tables
  if (supabase) {
    try {
      const [
        { data: profileRow, error: pErr },
        { data: projectRows, error: projErr },
        { data: skillRows },
        { data: orgRows },
        { data: certRows },
        { data: timelineRows }
      ] = await Promise.all([
        supabase.from("profiles").select("*").maybeSingle(),
        supabase.from("projects").select("*").order("display_order", { ascending: true }),
        supabase.from("skills").select("*").order("id", { ascending: true }),
        supabase.from("organizations").select("*").order("id", { ascending: true }),
        supabase.from("certificates").select("*").order("id", { ascending: true }),
        supabase.from("timeline").select("*").order("id", { ascending: true }),
      ]);

      if (!pErr && (profileRow || (projectRows && projectRows.length > 0))) {
        const mappedProfile = {
          ...localData.profile,
          ...(profileRow || {}),
          name: profileRow?.name || localData.profile.name,
          nickname: profileRow?.nickname || localData.profile.nickname || "Adjie",
          title: profileRow?.title || localData.profile.title,
          email: profileRow?.email || localData.profile.email,
          phone: profileRow?.phone || localData.profile.phone,
          location: profileRow?.location || localData.profile.location,
          about: profileRow?.about || localData.profile.about,
          avatar: profileRow?.avatar || localData.profile.avatar || "/assets/photo.png",
          linkedin: profileRow?.linkedin || localData.profile.linkedin,
          github: profileRow?.github || localData.profile.github,
        };

        const mappedProjects = (projectRows && projectRows.length > 0)
          ? projectRows.map((p) => {
              const img = p.image || "/dummy.png";
              const imgs = (p.images && p.images.length > 0) ? p.images : [img];
              return {
                title: p.title || "",
                role: p.role || "",
                period: p.period || "",
                techStack: p.tech_stack || [],
                shortDescription: p.short_description || "",
                bulletPoints: p.bullet_points || [],
                image: img,
                images: imgs,
                github: p.github || "",
                demo: p.demo || "",
              };
            })
          : localData.projects;

        const mappedSkills = (skillRows && skillRows.length > 0)
          ? skillRows.map((s) => ({
              name: s.name || "",
              category: s.category || "",
              level: s.level || "",
            }))
          : localData.skills;

        const mappedOrgs = (orgRows && orgRows.length > 0)
          ? orgRows.map((o) => ({
              organization: o.organization || "",
              role: o.role || "",
              period: o.period || "",
              description: o.description || "",
              image: o.image || "",
            }))
          : localData.organizations;

        const mappedCerts = (certRows && certRows.length > 0)
          ? certRows.map((c) => ({
              title: c.title || "",
              issuer: c.issuer || "",
              date: c.date || "",
              credentialId: c.credential_id || "",
              credentialUrl: c.credential_url || "",
              image: c.image || "",
            }))
          : localData.certificates;

        const mappedTimeline = (timelineRows && timelineRows.length > 0)
          ? timelineRows.map((t) => ({
              type: t.type || "",
              year: t.year || "",
              month: t.month || "",
              title: t.title || "",
              subtitle: t.subtitle || "",
              description: t.description || "",
            }))
          : localData.timeline;

        return {
          profile: mappedProfile,
          projects: mappedProjects,
          skills: mappedSkills,
          organizations: mappedOrgs,
          certificates: mappedCerts,
          timeline: mappedTimeline,
        };
      }
    } catch (err) {
      console.warn("Supabase multi-table query fallback to local synced data:", err.message);
    }
  }

  return localData;
}

export async function updateCVData(newData) {
  if (!newData.profile || !newData.skills || !newData.organizations || !newData.projects) {
    throw new Error("Invalid CV data structure");
  }
  const payload = normalizeCVData(newData);

  // 1. Sync to local JSON file (instant durability)
  try {
    const jsonPath = path.join(process.cwd(), "src/data/cv-data.json");
    await fs.writeFile(jsonPath, JSON.stringify(payload, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Could not write to local cv-data.json:", fsErr);
  }

  // 2. Sync to Supabase Multi-Tables
  if (supabase) {
    try {
      // 2.A Update Profile
      await supabase.from("profiles").upsert({
        id: 1,
        name: payload.profile.name || "",
        nickname: payload.profile.nickname || "Adjie",
        title: payload.profile.title || "",
        email: payload.profile.email || "",
        phone: payload.profile.phone || "",
        location: payload.profile.location || "",
        about: payload.profile.about || "",
        avatar: payload.profile.avatar || "/assets/photo.png",
        linkedin: payload.profile.linkedin || "",
        github: payload.profile.github || "",
      });

      // 2.B Update Projects
      const projectRows = (payload.projects || []).map((p, idx) => ({
        title: p.title || "",
        role: p.role || "",
        period: p.period || "",
        tech_stack: p.techStack || [],
        short_description: p.shortDescription || "",
        bullet_points: p.bulletPoints || [],
        image: p.image || "/dummy.png",
        images: p.images || [],
        github: p.github || "",
        demo: p.demo || "",
        display_order: idx + 1,
      }));
      await supabase.from("projects").delete().neq("id", 0);
      if (projectRows.length > 0) {
        await supabase.from("projects").insert(projectRows);
      }

      // 2.C Update Skills
      const skillRows = (payload.skills || []).map((s) => ({
        name: s.name || "",
        category: s.category || "",
        level: s.level || "",
      }));
      await supabase.from("skills").delete().neq("id", 0);
      if (skillRows.length > 0) {
        await supabase.from("skills").insert(skillRows);
      }

      // 2.D Update Organizations
      const orgRows = (payload.organizations || []).map((o) => ({
        organization: o.organization || "",
        role: o.role || "",
        period: o.period || "",
        description: o.description || "",
        image: o.image || "",
      }));
      await supabase.from("organizations").delete().neq("id", 0);
      if (orgRows.length > 0) {
        await supabase.from("organizations").insert(orgRows);
      }

      // 2.E Update Certificates
      const certRows = (payload.certificates || []).map((c) => ({
        title: c.title || "",
        issuer: c.issuer || "",
        date: c.date || "",
        credential_id: c.credentialId || "",
        credential_url: c.credentialUrl || "",
        image: c.image || "",
      }));
      await supabase.from("certificates").delete().neq("id", 0);
      if (certRows.length > 0) {
        await supabase.from("certificates").insert(certRows);
      }

      // 2.F Update Timeline
      const timelineRows = (payload.timeline || []).map((t) => ({
        type: t.type || "",
        year: t.year || "",
        month: t.month || "",
        title: t.title || "",
        subtitle: t.subtitle || "",
        description: t.description || "",
      }));
      await supabase.from("timeline").delete().neq("id", 0);
      if (timelineRows.length > 0) {
        await supabase.from("timeline").insert(timelineRows);
      }
    } catch (sbEx) {
      console.warn("Failed to sync to Supabase multi-tables:", sbEx.message);
    }
  }

  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/projects");
  revalidatePath("/organizations");
  revalidatePath("/contact");
  revalidatePath("/admin");
  return { success: true };
}

export async function submitContactMessage({ name, email, message }) {
  if (!name || !email || !message) {
    return { success: false, error: "Semua kolom nama, email, dan pesan wajib diisi." };
  }
  if (supabase) {
    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name,
          email,
          message,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        console.warn("Supabase contact_messages error:", error.message);
      }
    } catch (err) {
      console.warn("Failed to save contact message:", err.message);
    }
  }
  return { success: true };
}

export async function getContactMessages() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.warn("Error fetching contact messages:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn("Failed to fetch contact messages:", err.message);
    return [];
  }
}

export async function deleteContactMessage(id) {
  if (!supabase || !id) return { success: false };
  try {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
