"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code, UserCheck, BookOpen, Award, ExternalLink, X } from "lucide-react";
import CertificatePreview, { getCertificateFile, getCertificateType } from "./CertificatePreview";

const hardSkills = [
  { category: "Programming", items: ["C++", "Python", "Java", "PHP"] },
  { category: "Web Development", items: ["HTML", "CSS", "Streamlit", "Flask"] },
  { category: "Database", items: ["MySQL", "MariaDB"] },
  { category: "Machine Learning", items: ["Random Forest", "Naive Bayes"] },
  { category: "Tools", items: ["Git", "GitHub", "Figma"] },
  { category: "Others", items: ["Microsoft Word", "Excel", "Google Sheets"] },
];

const softSkills = [
  "Project Management",
  "Team Leadership",
  "Communication",
  "Problem Solving",
  "Public Speaking",
  "Teamwork",
];

const currentlyLearning = [
  "Next.js / React",
  "Tailwind CSS",
  "Full-stack deployment (Vercel, dll)",
];

export default function SkillsSection({ certificates = [] }) {
  const [previewCert, setPreviewCert] = useState(null);

  return (
    <section id="skills" className="pb-20 pt-12 relative max-w-5xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-semibold text-theme-heading mb-4">
          <Sparkles className="w-3 h-3 text-primary" />
          Keahlian & Kompetensi
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
          Full-Stack Developer & IT Project Manager
        </h2>
        <p className="text-theme-muted text-sm md:text-base max-w-lg mx-auto">
          Kombinasi kemampuan teknis dan soft skills untuk membangun produk digital yang berdampak.
        </p>
      </div>

      {/* Hard Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-theme-badge border border-theme-badge text-primary">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-theme-heading">Hard Skills — Technical</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hardSkills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              className="glass-panel rounded-2xl p-5 relative overflow-hidden group"
            >
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-3">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium px-3 py-1.5 rounded-xl bg-theme-badge border border-theme-badge text-theme-body hover:border-primary/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Soft Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-theme-badge border border-theme-badge text-primary">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-theme-heading">Soft Skills — Non-Technical</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {softSkills.map((skill) => (
            <div
              key={skill}
              className="px-4 py-2.5 rounded-2xl glass-panel text-sm font-medium text-theme-body hover:border-primary/30 hover:text-theme-heading transition-all cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-theme-badge border border-theme-badge text-primary">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-theme-heading">Sertifikat</h3>
        </div>

        {certificates.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <Award className="w-10 h-10 text-theme-subtle mx-auto mb-3 opacity-50" />
            <p className="text-sm text-theme-muted">Belum ada sertifikat ditampilkan.</p>
            <p className="text-xs text-theme-subtle mt-1">
              Tambahkan lewat panel admin → tab Sertifikat.
            </p>
          </div>
        ) : (
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
                  whileHover={{ y: -4 }}
                >
                  <div className="glass-panel rounded-2xl overflow-hidden group h-full hover:border-primary/30 transition-all">
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
                      <h4 className="text-sm font-bold text-theme-heading leading-snug mb-1">
                        {cert.title}
                      </h4>
                      {cert.issuer && (
                        <p className="text-xs text-primary font-semibold mb-1">{cert.issuer}</p>
                      )}
                      {cert.date && (
                        <p className="text-[11px] text-theme-muted">{cert.date}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {hasFile && (
                          <button
                            type="button"
                            onClick={() => setPreviewCert(cert)}
                            className="inline-flex items-center gap-1 text-[11px] text-theme-muted hover:text-primary transition-colors cursor-pointer"
                          >
                            Lihat pratinjau
                          </button>
                        )}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-theme-muted hover:text-primary transition-colors"
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
        )}
      </motion.div>

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
              className="relative w-full max-w-4xl max-h-[calc(100vh-7.5rem)] glass-panel rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-4 border-b border-theme-card">
                <h3 className="text-sm font-bold text-theme-heading pr-10">{previewCert.title}</h3>
                {previewCert.issuer && (
                  <p className="text-xs text-primary mt-0.5">{previewCert.issuer}</p>
                )}
              </div>
              <div className="p-4 overflow-auto max-h-[calc(100vh-12rem)]">
                {getCertificateType(previewCert) === "pdf" ? (
                  <iframe
                    src={getCertificateFile(previewCert)}
                    title={previewCert.title}
                    className="w-full h-[min(65vh,calc(100vh-14rem))] rounded-xl border border-theme-card bg-white"
                  />
                ) : (
                  <div className="relative w-full flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* Currently Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-theme-heading">Currently Learning</h3>
            </div>
            <p className="text-xs text-theme-muted mb-4">
              Teknologi yang sedang saya perdalam untuk meningkatkan kapabilitas sebagai developer.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {currentlyLearning.map((item) => (
                <span
                  key={item}
                  className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}