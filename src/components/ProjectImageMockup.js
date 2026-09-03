"use client";

import React from "react";
import { Terminal, Shield, Sparkles, Scissors, Camera, Trophy, Stethoscope, Lock, Image as ImageIcon, BookOpen, Layers, ShoppingBag } from "lucide-react";

export default function ProjectImageMockup({ title, role, techStack = [] }) {
  const t = title.toLowerCase();

  let theme = {
    bg: "from-blue-600 to-indigo-900",
    icon: Terminal,
    tag: "WEB APP",
    accent: "bg-blue-500",
  };

  if (t.includes("certify")) {
    theme = { bg: "from-blue-600 via-indigo-700 to-slate-900", icon: Shield, tag: "CERTIFICATE VERIFIER", accent: "bg-blue-400" };
  } else if (t.includes("solaria") || t.includes("pos")) {
    theme = { bg: "from-emerald-600 via-teal-800 to-slate-900", icon: ShoppingBag, tag: "RESTAURANT POS", accent: "bg-emerald-400" };
  } else if (t.includes("framecut")) {
    theme = { bg: "from-rose-600 via-purple-800 to-slate-900", icon: Scissors, tag: "PHOTOBOOTH KIOSK", accent: "bg-rose-400" };
  } else if (t.includes("fotosphere")) {
    theme = { bg: "from-purple-600 via-indigo-800 to-slate-900", icon: Camera, tag: "CREATIVE AGENCY", accent: "bg-purple-400" };
  } else if (t.includes("smashzone")) {
    theme = { bg: "from-amber-500 via-orange-700 to-slate-900", icon: Trophy, tag: "BADMINTON BOOKING", accent: "bg-amber-400" };
  } else if (t.includes("healthcare") || t.includes("ai")) {
    theme = { bg: "from-cyan-600 via-blue-800 to-slate-900", icon: Stethoscope, tag: "AI DIAGNOSTIC", accent: "bg-cyan-400" };
  } else if (t.includes("lockme")) {
    theme = { bg: "from-slate-700 via-slate-900 to-black", icon: Lock, tag: "SECURITY APP", accent: "bg-slate-400" };
  } else if (t.includes("nanopic")) {
    theme = { bg: "from-violet-600 via-fuchsia-800 to-slate-900", icon: ImageIcon, tag: "IMAGE OPTIMIZER", accent: "bg-violet-400" };
  } else if (t.includes("codehub")) {
    theme = { bg: "from-sky-600 via-blue-900 to-slate-900", icon: Layers, tag: "COMMUNITY PORTAL", accent: "bg-sky-400" };
  } else if (t.includes("edu") || t.includes("task")) {
    theme = { bg: "from-blue-700 via-indigo-900 to-slate-900", icon: BookOpen, tag: "MANAGEMENT SYSTEM", accent: "bg-blue-400" };
  }

  const IconComp = theme.icon;

  return (
    <div className={`relative w-full h-44 rounded-xl bg-gradient-to-br ${theme.bg} overflow-hidden p-5 flex flex-col justify-between shadow-inner group-hover:scale-[1.02] transition-transform duration-300`}>
      {/* Decorative Top Window Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 font-mono text-[9px] font-extrabold uppercase tracking-wider border border-white/10">
          {theme.tag}
        </span>
      </div>

      {/* Main Center UI Motif */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg shrink-0">
          <IconComp className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-extrabold text-white truncate tracking-tight drop-shadow-sm">
            {title}
          </h4>
          <p className="text-xs font-semibold text-slate-200/90 truncate">
            {role}
          </p>
        </div>
      </div>

      {/* Tech Chips Footer */}
      <div className="relative z-10 flex items-center gap-1.5 overflow-hidden">
        {techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-mono font-bold">
            {tech}
          </span>
        ))}
      </div>

      {/* Background Mesh Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
