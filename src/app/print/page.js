import React from "react";
import Link from "next/link";
import { getCVData } from "../actions";

export const dynamic = "force-dynamic";

export default async function PrintCV({ searchParams }) {
  const resolvedParams = await searchParams;
  const role = resolvedParams?.role || "standard";
  const data = await getCVData();
  const { profile, skills, organizations, projects } = data;

  // Tailor title and project priorities based on role
  let customTitle = profile.title;
  let customAbout = profile.about;
  let sortedProjects = [...projects];
  let prioritizedSkills = [...skills];

  if (role === "fullstack") {
    customTitle = "Full-Stack Web & Software Engineer";
    customAbout =
      "Spesialis Full-Stack Developer dengan keahlian mendalam pada ekosistem Next.js, React, Node.js, Laravel, dan arsitektur database relasional (PostgreSQL & MySQL). Berpengalaman merancang sistem produksi terintegrasi, API performa tinggi, dan aplikasi web modular.";
    sortedProjects.sort((a, b) => {
      const aScore = (a.role.toLowerCase().includes("full-stack") || a.role.toLowerCase().includes("front-end")) ? 1 : 0;
      const bScore = (b.role.toLowerCase().includes("full-stack") || b.role.toLowerCase().includes("front-end")) ? 1 : 0;
      return bScore - aScore;
    });
  } else if (role === "pm") {
    customTitle = "IT Project Manager & Technical Team Lead";
    customAbout =
      "Technical Project Manager & Agile Practitioner dengan rekam jejak kepemimpinan memimpin 15+ developer dan organisasi kemahasiswaan. Berpengalaman dalam penyusunan WBS, estimasi sprint, manajemen risiko, koordinasi stakeholder, dan penjaminan kualitas rilis produk software.";
    sortedProjects.sort((a, b) => {
      const aScore = (a.bulletPoints.some((bp) => bp.toLowerCase().includes("memimpin") || bp.toLowerCase().includes("manajemen"))) ? 1 : 0;
      const bScore = (b.bulletPoints.some((bp) => bp.toLowerCase().includes("memimpin") || bp.toLowerCase().includes("manajemen"))) ? 1 : 0;
      return bScore - aScore;
    });
  } else if (role === "ai") {
    customTitle = "AI & Python Software Engineer";
    customAbout =
      "AI & Machine Learning Engineer berpengalaman membangun aplikasi cerdas berbasis Python, Streamlit, dan integrasi Large Language Models (Google Gemini API). Mahir dalam algoritma machine learning (Random Forest, Naive Bayes), manipulasi data, dan deployment model terapan.";
    sortedProjects.sort((a, b) => {
      const aScore = (a.techStack.some((t) => t.toLowerCase().includes("python") || t.toLowerCase().includes("gemini") || t.toLowerCase().includes("ai"))) ? 1 : 0;
      const bScore = (b.techStack.some((t) => t.toLowerCase().includes("python") || t.toLowerCase().includes("gemini") || t.toLowerCase().includes("ai"))) ? 1 : 0;
      return bScore - aScore;
    });
  }

  return (
    <div className="bg-white text-zinc-800 p-6 sm:p-10 max-w-4xl mx-auto font-sans leading-relaxed selection:bg-zinc-100">
      {/* Print Instructions for Screen View */}
      <div className="no-print mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-extrabold uppercase tracking-wider text-blue-700 block mb-0.5">
            Format CV: {role === "fullstack" ? "Full-Stack Dev" : role === "pm" ? "IT Project Manager" : role === "ai" ? "AI & Python" : "Standar Lengkap"}
          </span>
          <p className="text-blue-800">
            Gunakan opsi <strong>Save as PDF</strong>, atur ukuran kertas ke <strong>A4</strong>, hilangkan Header & Footer browser, dan aktifkan <strong>Background graphics</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            className="px-3.5 py-1.5 bg-white border border-blue-200 text-blue-800 hover:bg-blue-100 rounded-xl font-bold shadow-sm text-xs transition-colors"
          >
            ← Kembali
          </Link>
          <a
            href="javascript:window.print()"
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm cursor-pointer text-center text-xs transition-colors"
          >
            Cetak / Simpan PDF
          </a>
        </div>
      </div>

      {/* CV Content */}
      <div className="print-page space-y-6">
        {/* Header section */}
        <div className="border-b-2 border-blue-600 pb-4">
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">{profile.name}</h1>
          <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mt-1">{customTitle}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-zinc-600 font-medium">
            {profile.email && <span>Email: {profile.email}</span>}
            {profile.phone && <span>Tel: {profile.phone}</span>}
            {profile.location && <span>Lokasi: {profile.location}</span>}
            {profile.github && (
              <span>
                GitHub: <a href={profile.github} className="text-blue-600 underline">github.com/Gammaura</a>
              </span>
            )}
            {profile.linkedin && (
              <span>
                LinkedIn: <a href={profile.linkedin} className="text-blue-600 underline">linkedin.com/in/ardityaadjierosandi</a>
              </span>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1">
            Ringkasan Profesional
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">{customAbout}</p>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1">
            Pengalaman Proyek Unggulan
          </h2>
          
          <div className="space-y-3.5">
            {sortedProjects.map((proj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-start text-xs">
                  <span className="font-bold text-zinc-900">{proj.title}</span>
                  <span className="text-[10px] text-zinc-500 font-bold">{proj.period}</span>
                </div>
                <div className="text-[10px] font-bold text-blue-600">
                  {proj.role} • <span className="text-zinc-500 font-medium">{proj.techStack.join(", ")}</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5">
                  {proj.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="text-[10px] text-zinc-600 leading-relaxed">
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Organizations Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1">
            Pengalaman Organisasi & Kepemimpinan
          </h2>

          <div className="space-y-3">
            {organizations.map((org, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-start text-xs">
                  <span className="font-bold text-zinc-900">{org.role}</span>
                  <span className="text-[10px] text-zinc-500 font-bold">{org.period}</span>
                </div>
                <div className="text-[10px] font-bold text-blue-600">
                  {org.organization} • <span className="text-zinc-500 font-medium">{org.location}</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5">
                  {org.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="text-[10px] text-zinc-600 leading-relaxed">
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1">
            Kompetensi Teknis & Keahlian
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {prioritizedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[9px] font-semibold bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded border border-zinc-200"
              >
                {skill.name} <span className="text-zinc-500 font-normal">({skill.level})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
