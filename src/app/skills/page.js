import React from "react";
import { getCVData } from "../actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getCVData();
  return {
    title: `Technical Skills & Credentials — ${data?.profile?.name || "Arditya Adjie Rosandi"}`,
    description: `Keahlian teknis dan sertifikasi profesional terverifikasi ${data?.profile?.name || "Arditya Adjie Rosandi"}.`,
  };
}

export default async function SkillsPage() {
  const data = await getCVData();
  const certs = (data?.certificates && data.certificates.length > 0) ? data.certificates : [
    {
      title: "Sertifikasi Pemrograman Web / Software Engineering",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      period: "2025 – 2028",
      description: "Sertifikasi kompetensi nasional standar BNSP untuk rekayasa perangkat lunak dan arsitektur web.",
      url: "/certificates/1781091881704-f05496ed719c.png"
    },
    {
      title: "Front-End & Back-End Web Developer Learning Path",
      issuer: "Dicoding Indonesia",
      period: "2024 – 2025",
      description: "Sertifikasi kelulusan kurikulum komprehensif pengembangan aplikasi web berbasis React, Node.js, dan REST API.",
      url: "/certificates/1781091835564-4c993f03c999.pdf"
    },
    {
      title: "Sertifikat Kepengurusan Organisasi & Mentoring",
      issuer: "Universitas Esa Unggul",
      period: "2025 – 2026",
      description: "Penghargaan resmi atas kepemimpinan CodeHub Esa Unggul dan koordinasi mentor fakultas PKKMB."
    }
  ];

  const skillClusters = [
    {
      title: "Full-Stack Web Engineering",
      desc: "Arsitektur frontend modern, SSR/SSG, dan API backend skala produksi.",
      tags: ["Next.js 14/16", "React 19", "Laravel 11", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"]
    },
    {
      title: "Database & Storage Systems",
      desc: "Manajemen data relasional, konkurensi transaksi, dan query optimization.",
      tags: ["PostgreSQL (Neon)", "Prisma ORM", "MySQL", "MariaDB", "AWS S3", "RESTful API"]
    },
    {
      title: "AI & Systems Engineering",
      desc: "Arsitektur Multi-Agent System (MAS), model NLP IndoBERT, dan otomatisasi alur kerja.",
      tags: ["Python", "FastAPI", "IndoBERT", "Multi-Agent System (MAS)", "Streamlit", "Gemini API"]
    },
    {
      title: "Tools, Mobile & Project Delivery",
      desc: "Manajemen proyek agile, kompilasi native mobile, dan koordinasi tim.",
      tags: ["Capacitor (Android/iOS)", "Git & GitHub", "Figma", "Agile / Scrum", "Jira / Trello"]
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: "var(--page-bg, #fff9f1)", color: "var(--page-ink, #17201c)" }}>
      <Navbar />
      <main className="flex-grow cream-page" style={{ paddingTop: "110px", paddingBottom: "60px" }}>
        <div className="cream-page-inner">
          <div className="page-kicker">
            <span><i></i> 03 / TECH ARSENAL & CREDENTIALS</span>
            <span>KOMPETENSI & SERTIFIKASI</span>
          </div>
          <h1 className="page-title">Technical Skills & Certified Credentials.</h1>
          <p className="page-subtitle">
            Keahlian mendalam dalam pengembangan web modern, arsitektur database, sistem kecerdasan buatan, serta sertifikasi profesional yang telah terverifikasi.
          </p>

          <h2 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "32px", marginBottom: "24px" }}>
            Core Competency Clusters
          </h2>
          <div className="archive-grid">
            {skillClusters.map((cluster, idx) => (
              <div className="archive-card" key={idx}>
                <div>
                  <h3>{cluster.title}</h3>
                  <p>{cluster.desc}</p>
                  <div className="archive-tags" style={{ marginTop: "16px" }}>
                    {cluster.tags.map((t) => (
                      <span key={t} className="archive-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "32px", margin: "60px 0 24px 0" }}>
            Verified Certifications
          </h2>
          <div className="archive-grid">
            {certs.map((c, idx) => (
              <div className="archive-card" key={idx}>
                <div>
                  <div className="archive-card-top" style={{ marginBottom: "10px" }}>
                    <span className="opacity-60">{c.period || c.year || "Terverifikasi"}</span>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", opacity: 0.75 }}>
                      {c.issuer}
                    </span>
                  </div>
                  <h3>{c.title || c.name}</h3>
                  <p>{c.description || "Sertifikasi resmi kompetensi bidang teknologi informasi dan rekayasa perangkat lunak."}</p>
                </div>
                <div className="archive-links">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      Lihat Dokumen Sertifikat
                    </a>
                  ) : (
                    <span className="opacity-50">Terverifikasi Kampus ✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer name={data?.profile?.name} />
    </div>
  );
}