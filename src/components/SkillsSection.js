"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, UserCheck, BookOpen, Award, ExternalLink, X, Terminal, Cpu, Database, Brain, Wrench, FileText, CheckCircle } from "lucide-react";
import CertificatePreview, { getCertificateFile, getCertificateType } from "./CertificatePreview";

const hardSkillCategories = [
  {
    category: "Programming",
    icon: Terminal,
    color: "indigo",
    items: ["C++", "Python", "Java", "PHP"],
    desc: "Bahasa Pemrograman Utama & Logika Backend",
  },
  {
    category: "Web Development",
    icon: Code,
    color: "sky",
    items: ["HTML", "CSS", "Streamlit", "Flask", "React", "Next.js"],
    desc: "Pengembangan Frontend & Antarmuka Web Modern",
  },
  {
    category: "Database",
    icon: Database,
    color: "emerald",
    items: ["MySQL", "MariaDB", "PostgreSQL"],
    desc: "Manajemen Data Relasional & Arsitektur Tabel",
  },
  {
    category: "Machine Learning",
    icon: Brain,
    color: "purple",
    items: ["Random Forest", "Naive Bayes"],
    desc: "Model Klasifikasi & Prediksi Data Terstruktur",
  },
  {
    category: "Tools",
    icon: Wrench,
    color: "rose",
    items: ["Git", "GitHub", "Figma"],
    desc: "Kolaborasi Kode, Kontrol Versi, & Prototyping UI",
  },
  {
    category: "Others",
    icon: FileText,
    color: "amber",
    items: ["Microsoft Word", "Excel", "Google Sheets"],
    desc: "Analisis Data, Dokumentasi, & Administrasi Proyek",
  },
];

const softSkills = [
  { name: "Project Management", desc: "Perencanaan timeline & manajemen alokasi tugas" },
  { name: "Team Leadership", desc: "Memimpin tim pengembang dari konsep hingga rilis" },
  { name: "Communication", desc: "Koordinasi efektif antar stakeholder & pengembang" },
  { name: "Problem Solving", desc: "Analisis akar masalah & penyelesaian teknis" },
  { name: "Public Speaking", desc: "Presentasi proyek & pelatihan teknis" },
  { name: "Teamwork", desc: "Kolaborasi adaptif dalam tim lintas disiplin" },
];

const currentlyLearning = [
  "Next.js 14 / App Router",
  "Tailwind CSS v4 & System Tokens",
  "Full-Stack Cloud Deployment (Vercel, Railway, Neon Postgres)",
];

export default function SkillsSection({ certificates = [] }) {
  const [previewCert, setPreviewCert] = useState(null);

  return (
    <section id="skills" className="pt-28 pb-20 md:pt-36 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Curated Technical Stack
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Keahlian & Ekosistem
          </h1>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
          Spektrum kemampuan teknis dan soft skills yang digunakan untuk merancang, mengintegrasikan, dan mengeksekusi sistem aplikasi modern.
        </p>
      </div>

      {/* Hard Skills (Technical) */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Hard Skills — Technical Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardSkillCategories.map((group, idx) => {
            const IconComp = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {group.items.length} Techs
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {group.category}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {group.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Soft Skills (Non-Technical) */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-0.5 bg-rose-600 dark:bg-rose-400"></span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Soft Skills — Management & Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {softSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl shadow-sm flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                  {skill.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Currently Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-800/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                  Continuous Improvement
                </span>
                <h3 className="text-xl font-bold text-white">Currently Learning & Refining</h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-2xl leading-relaxed">
              Teknologi dan arsitektur terkini yang sedang diperdalam untuk meningkatkan standar efisiensi, skalabilitas, dan keamanan aplikasi produksi.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {currentlyLearning.map((item) => (
                <span
                  key={item}
                  className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-white backdrop-blur-sm"
                >
                  ⚡ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Sertifikasi & Lisensi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificates.map((cert, idx) => {
              const hasFile = Boolean(getCertificateFile(cert));

              return (
                <motion.div
                  key={`${cert.title}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                    <button
                      type="button"
                      onClick={() => hasFile && setPreviewCert(cert)}
                      disabled={!hasFile}
                      className={`w-full text-left ${hasFile ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <CertificatePreview
                        cert={cert}
                        className="relative aspect-[4/3] w-full"
                      />
                    </button>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1">
                        {cert.title}
                      </h4>
                      {cert.issuer && (
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">{cert.issuer}</p>
                      )}
                      {cert.date && (
                        <p className="text-[11px] text-slate-500">{cert.date}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {hasFile && (
                          <button
                            type="button"
                            onClick={() => setPreviewCert(cert)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                          >
                            Lihat Pratinjau
                          </button>
                        )}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            Verifikasi
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm"
            onClick={() => setPreviewCert(null)}
          >
            <div className="flex min-h-full items-center justify-center p-4 pt-24 pb-8 sm:pt-28">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-4xl max-h-[calc(100vh-7.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors cursor-pointer"
                  aria-label="Tutup pratinjau"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white pr-10">{previewCert.title}</h3>
                  {previewCert.issuer && (
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">{previewCert.issuer}</p>
                  )}
                </div>
                <div className="p-4 overflow-auto max-h-[calc(100vh-12rem)]">
                  {getCertificateType(previewCert) === "pdf" ? (
                    <iframe
                      src={getCertificateFile(previewCert)}
                      title={previewCert.title}
                      className="w-full h-[min(65vh,calc(100vh-14rem))] rounded-xl border border-slate-200 dark:border-slate-800 bg-white"
                    />
                  ) : (
                    <div className="relative w-full flex items-center justify-center">
                      <img
                        src={getCertificateFile(previewCert)}
                        alt={previewCert.title}
                        className="max-w-full max-h-[min(65vh,calc(100vh-14rem))] object-contain rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}