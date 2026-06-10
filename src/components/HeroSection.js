"use client";

import React from "react";
import { motion } from "framer-motion";
import PDFDownloadButton from "./PDFDownloadButton";
import { MapPin, Mail } from "lucide-react";

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

export default function HeroSection({ profile }) {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 hero-bg-image"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        }}
      />
      <div className="hero-scrim-base absolute inset-0 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(3,7,18,0.85) 0%, rgba(3,7,18,0.2) 50%, rgba(3,7,18,0.1) 100%)" }}
      />
      <div className="hero-scrim-fade absolute inset-x-0 bottom-0 pointer-events-none" />

      {/* Idle: ambient glow blob kiri */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          left: "-15%",
          top: "20%",
          background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Idle: ambient glow blob kanan */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          right: "-10%",
          top: "30%",
          background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center pt-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full hero-glass text-xs font-semibold hero-text-heading mb-6"
        >
          {/* Idle: pulse dot */}
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Selamat Datang di Portfolio Saya
        </motion.div>

        {/* Photo — idle float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            {/* Idle: outer glow ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 0 4px rgba(220,38,38,0.3)" }}
              animate={{ boxShadow: [
                "0 0 0 4px rgba(220,38,38,0.3)",
                "0 0 0 10px rgba(220,38,38,0.08)",
                "0 0 0 4px rgba(220,38,38,0.3)",
              ]}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Idle: float up-down */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-44 h-44 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-transparent overflow-hidden mx-auto"
            >
              <img
                src="/photo.png"
                alt="Arditya Adjie Rosandi"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 hero-title"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          Arditya Adjie Rosandi
        </motion.h1>

        {/* Subtitle — idle shimmer underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 relative inline-block"
        >
          <h2
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "18px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {profile.title}
          </h2>
          {/* Idle: shimmer line bawah subtitle */}
          <motion.div
            className="absolute bottom-0 left-0 h-px rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.8), transparent)" }}
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.div>

        {/* Location & Email */}
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

        {/* CTA */}
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
