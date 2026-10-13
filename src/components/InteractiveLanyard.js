"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, ShieldCheck, Sparkles, Award, Cpu, Wifi } from "lucide-react";

export default function InteractiveLanyard({ profile }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural return
  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 });

  // Restrained tilt angles (±10 degrees) so it never clips or flies out of frame
  const rotateX = useTransform(springY, [-120, 120], [9, -9]);
  const rotateY = useTransform(springX, [-120, 120], [-9, 9]);

  // Holographic glare position
  const sheenX = useTransform(springX, [-120, 120], ["15%", "85%"]);
  const sheenY = useTransform(springY, [-120, 120], ["15%", "85%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full select-none"
      style={{ perspective: 1200 }}
    >
      {/* Top Lanyard Strap - Connected Directly */}
      <div className="flex flex-col items-center relative z-20 pointer-events-none">
        {/* Fabric Woven Lanyard Ribbon */}
        <div className="w-10 h-10 -mb-2 relative">
          <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible drop-shadow-sm">
            <defs>
              <linearGradient id="strapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0b0f1a" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#0b0f1a" />
              </linearGradient>
            </defs>
            <path
              d="M 12 0 L 20 28 L 28 0"
              fill="none"
              stroke="url(#strapGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 12 0 L 20 28 L 28 0"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeDasharray="2 3"
              strokeOpacity="0.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Chrome / Metal Clip Fitting */}
        <div className="relative flex flex-col items-center -mt-1 z-30">
          <div className="w-7 h-3 rounded bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 border border-slate-500/40 shadow-sm" />
          <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-gradient-to-b from-slate-200 to-slate-400 shadow-inner -mt-1" />
        </div>
      </div>

      {/* 3D Interactive Card Component */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-[300px] sm:w-[320px] rounded-3xl p-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden cursor-pointer -mt-2 z-10 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]"
      >
        {/* Dynamic Iridescent Holographic Sheen Layer */}
        <motion.div
          style={{
            background: `radial-gradient(circle 180px at ${sheenX} ${sheenY}, rgba(255,255,255,0.45) 0%, rgba(147,197,253,0.2) 35%, transparent 70%)`,
          }}
          className="absolute inset-0 pointer-events-none z-30 rounded-3xl"
        />

        {/* Holographic Security Foil Strip (diagonal reflection) */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-transparent rounded-full blur-xl pointer-events-none" />

        {/* Punch Hole for Lanyard Clip */}
        <div className="w-7 h-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 border border-slate-400/60 dark:border-slate-600 mx-auto mb-3 flex items-center justify-center shadow-inner">
          <div className="w-5 h-1.5 rounded-full bg-slate-400/80 dark:bg-slate-600/80" />
        </div>

        {/* Header Ribbon / University & Branding */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-sm">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-black text-xs text-slate-900 dark:text-white tracking-tight block leading-none">
                GAMMAURA
              </span>
              <span className="text-[9px] font-mono font-semibold text-slate-400 tracking-wider">
                ID CARD #2023
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-wider">VERIFIED</span>
          </div>
        </div>

        {/* Card Body: Photo & Identity */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-800 shrink-0">
            <Image
              src="/photo.png"
              alt={profile?.name || "Arditya Adjie Rosandi"}
              width={80}
              height={80}
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {profile?.name || "Arditya Adjie Rosandi"}
            </h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5 leading-tight">
              Full-Stack Developer & IT Project Manager
            </p>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mt-1">
              Universitas Esa Unggul
            </span>
          </div>
        </div>

        {/* Credentials & Key Metrics Pill */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              ACADEMIC GPA
            </span>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400 leading-tight block">
              3.84
            </span>
            <span className="text-[10px] font-medium text-slate-500">Skala 4.00</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              LEADERSHIP
            </span>
            <span className="text-xs font-black text-slate-900 dark:text-white mt-1 block">
              Chairman
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              CodeHub UEU
            </span>
          </div>
        </div>

        {/* Technical Chip & NFC Security Watermark */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>NFC // TECH 2026</span>
          </div>

          {/* Barcode Accent */}
          <div className="flex gap-0.5 h-4 items-center opacity-70">
            {[2, 3, 1, 4, 2, 5, 1, 3, 2, 4, 2, 3].map((w, i) => (
              <div key={i} className="bg-slate-900 dark:bg-white h-full" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>

        {/* Tactile Tilt Hint */}
        <div className="mt-2 text-center">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            ✦ ARAHKAN KURSOR UNTUK EFEK 3D
          </span>
        </div>
      </motion.div>
    </div>
  );
}
