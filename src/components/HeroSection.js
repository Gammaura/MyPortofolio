"use client";

import React from "react";
import { motion } from "framer-motion";
import PDFDownloadButton from "./PDFDownloadButton";
import { MapPin, Mail, School, Sparkles, ArrowUpRight, ShieldCheck, Code, Award } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroSection({ profile }) {
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headline & Value Prop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Status Pill with Pulsing Dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Internship & Technical Leadership Roles</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
            Arditya Adjie <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400">Rosandi</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8 font-medium">
            Mahasiswa Teknik Informatika Universitas Esa Unggul (IPK 3.84). Berfokus pada pembangunan arsitektur sistem web skala produksi, aplikasi AI, dan manajemen proyek TI yang disiplin.
          </p>

          {/* Metadata Pill Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Tangerang, Banten</span>
            </div>
            <a
              href="mailto:ardityaa.id@gmail.com"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>ardityaa.id@gmail.com</span>
            </a>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
              <School className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>IPK 3.84 / 4.00</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <PDFDownloadButton variant="hero" />

            <a
              href="https://github.com/Gammaura"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/ardityaadjierosandi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Premium Profile Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10 transition-all duration-300 hover:shadow-2xl">
            {/* Header Badge & Verified Tag */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  GAMMAURA PORTFOLIO
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-extrabold uppercase tracking-wider">
                VERIFIED #2023
              </span>
            </div>

            {/* Avatar & Photo Showcase */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md shrink-0 bg-slate-100 dark:bg-slate-800">
                <img
                  src="/photo.png"
                  alt="Arditya Adjie Rosandi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://github.com/Gammaura.png";
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Arditya Adjie Rosandi
                </h3>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  Full-Stack Dev & IT Project Manager
                </p>
                <span className="text-[11px] font-medium text-slate-500 block mt-1">
                  Universitas Esa Unggul (Tangerang)
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  ACADEMIC GPA
                </span>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  3.84
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Skala 4.00 Kumulatif</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  DELIVERED PROJ.
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  12+
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Production Apps</span>
              </div>
            </div>

            {/* Leadership Banner */}
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-extrabold text-blue-900 dark:text-blue-200">
                  Chairman CodeHub & Branch Head BEM
                </div>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                  Memimpin 15+ pengembang & mengkoordinasikan program kerja fakultas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
