"use client";

import React, { useState } from "react";
import { Download, ChevronDown, Code, Briefcase, Bot, FileText } from "lucide-react";

const cvOptions = [
  { label: "CV Full-Stack Developer", icon: Code, desc: "Fokus Next.js, React, Node.js, Laravel" },
  { label: "CV IT Project Manager", icon: Briefcase, desc: "Fokus Leadership, Agile/Scrum, WBS" },
  { label: "CV AI & Python Engineer", icon: Bot, desc: "Fokus Machine Learning, Streamlit, LLM" },
  { label: "CV Print Standard (A4)", icon: FileText, desc: "Format Ringkas untuk Cetak Dokumen" },
];

export default function PDFDownloadButton({ variant = "default" }) {
  const [open, setOpen] = useState(false);

  const handleDownloadRole = (label) => {
    setOpen(false);
    window.open("/print", "_blank");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all cursor-pointer"
        type="button"
      >
        <Download className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
        <span>Unduh PDF CV</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
              Pilih Fokus Format CV:
            </div>
            {cvOptions.map((opt) => {
              const IconComp = opt.icon;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleDownloadRole(opt.label)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-start gap-2.5 transition-colors group cursor-pointer"
                  type="button"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-[10px] font-medium text-slate-500">
                      {opt.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}