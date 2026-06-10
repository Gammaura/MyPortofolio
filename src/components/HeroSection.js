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
    className="absolute rounded-full bg-indigo-400/40 pointer-events-none"
    style={style}
    animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function HeroSection({ profile, allData }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = typeof window !== "undefined" ? document.documentElement.getAttribute("data-theme") : "dark";
  const isDark = !mounted || theme !== "light";

  const bgImage = isDark
    ? "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')"
    : "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&fit=crop&sat=-100')";
  
  const overlayOpacity = isDark ? "bg-black/40" : "bg-black/20";
  const gradientFrom = isDark ? "from-zinc-950" : "from-white";
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
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t ${gradientFrom} to-transparent`} />

      {particles.map((style, i) => (
        <FloatingParticle key={i} style={style} />
      ))}

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Tersedia Untuk Magang & Project
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg"
        >
          Halo, Saya{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl font-semibold text-white/80 mb-6 drop-shadow"
        >
          {profile.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8"
        >
          {profile.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/80 mb-10"
        >
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-cyan-300" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
            <Mail className="w-3.5 h-3.5 text-cyan-300" />
            {profile.email}
          </span>
        </motion.div>

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
              className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all hover:scale-105"
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
