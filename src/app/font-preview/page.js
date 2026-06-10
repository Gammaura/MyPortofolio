"use client";

import { motion } from "framer-motion";

const fonts = [
  {
    label: "A",
    name: "Plus Jakarta Sans",
    variable: "var(--font-plus-jakarta)",
    desc: "Bulat, modern, friendly — yang sekarang dipakai",
  },
  {
    label: "B",
    name: "Syne",
    variable: "var(--font-syne)",
    desc: "Geometric, futuristik, berkarakter kuat",
  },
  {
    label: "C",
    name: "Space Grotesk",
    variable: "var(--font-space-grotesk)",
    desc: "Clean tapi ada quirk-nya, lebih berkarakter",
  },
  {
    label: "D",
    name: "Outfit",
    variable: "var(--font-outfit)",
    desc: "Elegant, modern, sedikit lebih tipis",
  },
  {
    label: "E",
    name: "DM Sans",
    variable: "var(--font-dm-sans)",
    desc: "Minimal, clean, professional — less is more",
  },
  {
    label: "F",
    name: "Geist Sans",
    variable: "var(--font-geist-sans)",
    desc: "Font Vercel — ultra clean, developer aesthetic",
  },
];

export default function FontPreview() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="min-h-screen py-20 px-6"
        style={{ background: "linear-gradient(to bottom, rgba(3,7,18,0.75), rgba(3,7,18,0.92))" }}
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">
              Font Preview
            </p>
            <p className="text-white/50 text-sm">
              Pilih font yang paling kamu suka — A sampai F
            </p>
          </motion.div>

          {/* Font Cards */}
          <div className="flex flex-col gap-2">
            {fonts.map((font, i) => (
              <motion.div
                key={font.label}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.015,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  transition: { duration: 0.2 },
                }}
                className="group rounded-2xl px-8 py-8 cursor-default border border-transparent hover:border-white/10 transition-colors duration-300"
              >
                {/* Label row */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs font-bold group-hover:bg-white/20 group-hover:text-white transition-all duration-300"
                  >
                    {font.label}
                  </motion.span>
                  <span className="text-white/40 text-xs tracking-widest uppercase group-hover:text-white/60 transition-colors duration-300">
                    {font.name}
                  </span>
                  <span className="text-white/20 text-xs group-hover:text-white/40 transition-colors duration-300">
                    — {font.desc}
                  </span>
                </div>

                {/* Name */}
                <motion.h1
                  style={{
                    fontFamily: font.variable,
                    fontSize: "clamp(40px, 6vw, 72px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                >
                  Arditya Adjie Rosandi
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  style={{
                    fontFamily: font.variable,
                    fontSize: "clamp(12px, 1.5vw, 18px)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginTop: "6px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                >
                  Full-Stack Developer & IT Project Manager
                </motion.p>

                {/* Hover underline */}
                <motion.div
                  className="h-px bg-gradient-to-r from-red-500/50 to-transparent mt-6"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/20 text-xs mt-16 tracking-widest uppercase"
          >
            Hover tiap card untuk preview interaktif
          </motion.p>
        </div>
      </div>
    </div>
  );
}
