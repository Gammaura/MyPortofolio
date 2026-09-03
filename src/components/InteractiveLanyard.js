"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Terminal, ShieldCheck, Sparkles } from "lucide-react";

export default function InteractiveLanyard({ profile }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for 3D physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics setup for smooth pendulum return
  const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseY, [-150, 150], [25, -25]);
  const rotateY = useTransform(mouseX, [-150, 150], [-25, 25]);
  const shineX = useTransform(mouseX, [-150, 150], [0, 100]);
  const shineY = useTransform(mouseY, [-150, 150], [0, 100]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-start w-full py-4 select-none touch-none"
      style={{ perspective: 1000 }}
    >
      {/* Top Lanyard Strap Container */}
      <div className="relative flex flex-col items-center z-10">
        {/* Fabric Strap Spline */}
        <svg width="120" height="90" viewBox="0 0 120 90" className="overflow-visible">
          <defs>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path
            d="M 20 0 Q 60 75 100 0"
            fill="none"
            stroke="url(#strapGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            className="drop-shadow-md"
          />
          <path
            d="M 20 0 Q 60 75 100 0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Metallic Clip & Hook */}
        <div className="relative -mt-3 flex flex-col items-center z-20">
          <div className="w-8 h-4 rounded-md bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 border border-slate-400/80 shadow-md" />
          <div className="w-4 h-5 rounded-b-full border-2 border-slate-400 bg-slate-300 shadow-inner -mt-1" />
        </div>
      </div>

      {/* 3D Interactive Card Component */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 80 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          x.set(0);
          y.set(0);
        }}
        style={{
          rotateX,
          rotateY,
          x: mouseX,
          y: mouseY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-72 sm:w-80 h-[430px] rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing z-30 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)]"
      >
        {/* Holographic Glare Overlay */}
        <motion.div
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
          }}
          className="absolute inset-0 pointer-events-none z-40 rounded-3xl"
        />

        {/* Metallic Hole Ring */}
        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-400 mx-auto mb-4 flex items-center justify-center shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-600" />
        </div>

        {/* Card Header Branding */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-xs text-slate-900 dark:text-white tracking-tight">
              GAMMAURA
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[9px] font-mono font-extrabold uppercase tracking-wider">
            VERIFIED #2023
          </span>
        </div>

        {/* Avatar & Photo Showcase */}
        <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-800">
          <img
            src="/photo.png"
            alt={profile?.name || "Arditya Adjie Rosandi"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://github.com/Gammaura.png";
            }}
          />
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
        </div>

        {/* Name & Role Details */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            {profile?.name || "Arditya Adjie Rosandi"}
          </h3>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
            Full-Stack Dev & IT Project Manager
          </p>
        </div>

        {/* Academic & University Details */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/80 mb-4 text-center">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
            UNIVERSITAS ESA UNGGUL
          </span>
          <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>IPK 3.84 / 4.00 (Teknik Informatika)</span>
          </div>
        </div>

        {/* Barcode & Footer Motif */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex gap-0.5 h-5 items-center opacity-70">
            {[2, 4, 1, 3, 5, 2, 4, 1, 3, 2, 4, 3].map((w, i) => (
              <div key={i} className="bg-slate-900 dark:bg-white h-full" style={{ width: `${w}px` }} />
            ))}
          </div>
          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">
            ID: UEU-2023-TECH
          </span>
        </div>

        {/* Drag Hint */}
        <div className="mt-2 text-center">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            ↔ DRAG OR TILT CARD
          </span>
        </div>
      </motion.div>
    </div>
  );
}
