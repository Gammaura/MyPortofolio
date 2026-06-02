"use client";

import React from "react";
import { motion } from "framer-motion";
import PDFDownloadButton from "./PDFDownloadButton";
import { MapPin, Mail, Sparkles } from "lucide-react";

const Github = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroSection({ profile, allData }) {
  return (
    <section id="about" className="relative pt-36 pb-20 overflow-hidden flex items-center justify-center">
      {/* Background Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600 top-20 left-10" />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500 bottom-10 right-10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Tersedia Untuk Magang & Project
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
        >
          Halo, Saya <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{profile.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl font-semibold text-zinc-300 mb-6"
        >
          {profile.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8"
        >
          {profile.about}
        </motion.p>

        {/* Contact Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 mb-10"
        >
          <span className="flex items-center gap-1 bg-zinc-900/60 border border-white/5 px-3 py-1.5 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1 bg-zinc-900/60 border border-white/5 px-3 py-1.5 rounded-lg">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            {profile.email}
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PDFDownloadButton data={allData} />

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-indigo-500/50 rounded-xl text-zinc-300 hover:text-white transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-indigo-500/50 rounded-xl text-zinc-300 hover:text-white transition-all hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
