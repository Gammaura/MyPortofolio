import React from "react";
import { getCVData } from "../actions";

export const dynamic = "force-dynamic";

export default async function PrintCV() {
  const data = await getCVData();
  const { profile, skills, organizations, projects } = data;

  return (
    <div className="bg-white text-zinc-800 p-8 max-w-4xl mx-auto font-sans leading-relaxed selection:bg-zinc-100">
      {/* Print Instructions for Screen View */}
      <div className="no-print mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-700 flex items-center justify-between">
        <div>
          <span className="font-bold">Tips Cetak:</span> Gunakan opsi <span className="font-bold">Save as PDF</span>, atur ukuran kertas ke <span className="font-bold">A4</span>, hilangkan Header & Footer bawaan browser, dan aktifkan <span className="font-bold">Background graphics</span> jika ingin tampilan badge berwarna tetap tercetak.
        </div>
        <a
          href="javascript:window.print()"
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm cursor-pointer text-center text-xs"
        >
          Cetak Sekarang
        </a>
      </div>

      {/* CV Content */}
      <div className="print-page space-y-6">
        {/* Header section */}
        <div className="border-b-2 border-indigo-600 pb-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{profile.name}</h1>
          <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mt-1">{profile.title}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-zinc-500 font-medium">
            {profile.email && <span>✉ {profile.email}</span>}
            {profile.phone && <span>☎ {profile.phone}</span>}
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.github && (
              <span>
                GitHub: <a href={profile.github} className="text-indigo-600 underline">github.com/Gammaura</a>
              </span>
            )}
            {profile.linkedin && (
              <span>
                LinkedIn: <a href={profile.linkedin} className="text-indigo-600 underline">linkedin.com/in/gammaura</a>
              </span>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1">
            Tentang Saya
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">{profile.about}</p>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1">
            Riwayat Project
          </h2>
          
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-start text-xs">
                  <span className="font-bold text-zinc-800">{proj.title}</span>
                  <span className="text-[10px] text-zinc-500 font-bold">{proj.period}</span>
                </div>
                <div className="text-[10px] font-bold text-indigo-600">
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
            Riwayat Organisasi
          </h2>

          <div className="space-y-3">
            {organizations.map((org, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-start text-xs">
                  <span className="font-bold text-zinc-800">{org.role}</span>
                  <span className="text-[10px] text-zinc-500 font-bold">{org.period}</span>
                </div>
                <div className="text-[10px] font-bold text-indigo-600">
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
            Keahlian & Tools
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[9px] font-semibold bg-zinc-100 text-zinc-700 px-2 py-1 rounded border border-zinc-200"
              >
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-trigger Print Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Auto trigger print dialog after page loads
            setTimeout(function() {
              window.print();
            }, 800);
          `,
        }}
      />
    </div>
  );
}
