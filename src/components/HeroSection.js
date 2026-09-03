"use client";

import React from "react";
import { motion } from "framer-motion";
import PDFDownloadButton from "./PDFDownloadButton";
import { MapPin, Mail, School } from "lucide-react";

const Github = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroSection({ profile }) {
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Subtle Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Full-Stack Developer & IT Project Manager</span>
        </motion.div>

        {/* Clean Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-700 shadow-md mb-6 bg-slate-200 dark:bg-slate-800"
        >
          <img
            src="/photo.png"
            alt={profile.name || "Arditya Adjie Rosandi"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://github.com/Gammaura.png";
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl flex flex-col items-center mb-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {profile.name || "Arditya Adjie Rosandi"}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mt-3 leading-relaxed font-medium">
            Mahasiswa Teknik Informatika Universitas Esa Unggul (IPK 3.84). Berfokus pada pembangunan arsitektur sistem web skala produksi, aplikasi AI, dan manajemen proyek TI yang disiplin.
          </p>
        </motion.div>

        {/* Metadata Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{profile.location || "Tangerang, Banten"}</span>
          </div>
          <a
            href={`mailto:${profile.email || "ardityaa.id@gmail.com"}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{profile.email || "ardityaa.id@gmail.com"}</span>
          </a>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-800 font-extrabold">
            <School className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>IPK 3.84 / 4.00</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <PDFDownloadButton variant="hero" />

          <a
            href={profile.github || "https://github.com/Gammaura"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.linkedin || "https://www.linkedin.com/in/ardityaadjierosandi"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
