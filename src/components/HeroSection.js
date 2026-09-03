"use client";

import React from "react";
import { motion } from "framer-motion";
import PDFDownloadButton from "./PDFDownloadButton";
import { MapPin, Mail, School, Terminal } from "lucide-react";

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
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Top Ambient Glow Aura */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-indigo-200/50 via-sky-200/40 to-rose-200/50 dark:from-indigo-900/30 dark:via-sky-950/20 dark:to-rose-900/30 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-slate-800 mb-6 transition-transform hover:-translate-y-0.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Selamat Datang di Portfolio Saya
          </span>
        </motion.div>

        {/* Avatar with Dynamic Gradient Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6 group"
        >
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl p-1 gradient-gammaura shadow-xl transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
            <div className="w-full h-full rounded-[22px] overflow-hidden bg-white dark:bg-slate-900">
              <img
                src="/photo.png"
                alt={profile.name || "Arditya Adjie Rosandi"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://github.com/Gammaura.png";
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-1 bg-indigo-600 text-white text-[11px] font-bold rounded-lg shadow-md flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>DEV & PM</span>
          </div>
        </motion.div>

        {/* Main Typography Stack */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl flex flex-col items-center gap-2 mb-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {profile.name || "Arditya Adjie Rosandi"}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gradient-gammaura">
            {profile.title || "Full-Stack Developer & IT Project Manager"}
          </p>
        </motion.div>

        {/* Quick Metadata Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{profile.location || "Tangerang, Banten"}</span>
          </div>
          <a
            href={`mailto:${profile.email || "ardityaa.id@gmail.com"}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{profile.email || "ardityaa.id@gmail.com"}</span>
          </a>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 text-xs font-extrabold tracking-wider border border-indigo-200 dark:border-indigo-800">
            <School className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>IPK 3.84 / 4.00</span>
          </div>
        </motion.div>

        {/* CTA Buttons & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <PDFDownloadButton variant="hero" />

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <a
              href={profile.github || "https://github.com/Gammaura"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4 text-slate-900 dark:text-white" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedin || "https://www.linkedin.com/in/ardityaadjierosandi"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
