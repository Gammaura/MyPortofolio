"use client";

import React from "react";
import { motion } from "framer-motion";
import PDFDownloadButton from "./PDFDownloadButton";
import { MapPin, Mail, Sparkles } from "lucide-react";

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FloatingParticle = ({ style }) => (
  <motion.div
    className="absolute rounded-full hero-particle pointer-events-none"
    style={style}
    animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function HeroSection({ profile, allData }) {
  const particles = [
    { top: "15%", left: "8%", width: 8, height: 8 },
    { top: "70%", left: "5%", width: 6, height: 6 },
    { top: "30%", right: "7%", width: 10, height: 10 },
    { top: "75%", right: "10%", width: 7, height: 7 },
    { top: "50%", left: "15%", width: 5, height: 5 },
    { top: "20%", right: "20%", width: 9, height: 9 },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 hero-bg-image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        }}
      />
      <div className="hero-scrim-base absolute inset-0 pointer-events-none" />
      <div className="hero-scrim-fade absolute inset-x-0 bottom-0 pointer-events-none" />

      {particles.map((style, i) => (
        <FloatingParticle key={i} style={style} />
      ))}

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center hero-content">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full hero-glass text-xs font-semibold hero-text-heading mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Tersedia Untuk Magang & Project
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight hero-text-heading mb-4 hero-title"
        >
          Halo, Saya {profile.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl font-semibold hero-text-body mb-6 hero-subtitle"
        >
          {profile.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-text-muted text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8"
        >
          {profile.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs hero-text-body mb-10"
        >
          <span className="flex items-center gap-1.5 hero-glass px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1.5 hero-glass px-3 py-1.5 rounded-full">
            <Mail className="w-3.5 h-3.5 text-primary" />
            {profile.email}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PDFDownloadButton variant="hero" />

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 hero-glass rounded-full hero-text-body hover:text-white transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 hero-glass rounded-full hero-text-body hover:text-white transition-all hover:scale-105"
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