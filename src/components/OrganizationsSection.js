"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  Code,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const iconMap = {
  start: GraduationCap,
  milestone: Users,
  work: Code,
  future: Target,
};

const typeLabel = {
  start: "Awal Perjalanan",
  milestone: "Organisasi",
  work: "Project",
  future: "Target",
};

const dotColorMap = {
  start: "bg-emerald-500 border-emerald-400 shadow-emerald-500/50",
  milestone: "bg-primary border-primary shadow-primary/50",
  work: "bg-indigo-500 border-indigo-400 shadow-indigo-500/50",
  future: "bg-accent border-blue-400 shadow-accent/50",
};

const cardAccentMap = {
  start: "border-emerald-500/20 hover:border-emerald-500/40",
  milestone: "border-primary/20 hover:border-primary/40",
  work: "border-indigo-500/20 hover:border-indigo-500/40",
  future: "border-accent/20 hover:border-accent/40",
};

const iconBgMap = {
  start: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  milestone: "bg-primary/10 border-primary/20 text-primary",
  work: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  future: "bg-accent/10 border-accent/20 text-blue-400",
};

const badgeMap = {
  start: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  milestone: "bg-primary/10 text-primary border-primary/20",
  work: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  future: "bg-accent/10 text-blue-400 border-accent/20",
};

export default function OrganizationsSection({ timeline = [], organizations = [] }) {
  const [expandedOrg, setExpandedOrg] = useState(null);

  return (
    <section id="organizations" className="pb-20 pt-6 relative max-w-5xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-semibold text-theme-heading mb-4">
          <Sparkles className="w-3 h-3 text-primary" />
          Perjalanan & Organisasi
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
          Roadmap Perjalanan
        </h2>
        <p className="text-theme-muted text-sm max-w-lg mx-auto">
          Selain ngoding, gua aktif di dunia organisasi kampus — dari koordinator mentor sampai jadi ketua.
          Ini yang ngebentuk kemampuan leadership, komunikasi, dan project management gua secara nyata.
        </p>
      </div>

      {/* ── ROADMAP TIMELINE (zigzag flow) ── */}
      {timeline.length > 0 && (
        <div className="relative mb-20 max-w-4xl mx-auto">
          {/* Flow connector — desktop zigzag */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block text-theme-subtle/30"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={timeline
                .slice(0, -1)
                .map((_, idx) => {
                  const isLeft = idx % 2 === 0;
                  const x1 = isLeft ? "28%" : "72%";
                  const y1 = `${12 + idx * 14}%`;
                  const x2 = isLeft ? "72%" : "28%";
                  const y2 = `${12 + (idx + 1) * 14}%`;
                  return `M ${x1} ${y1} C ${x1} ${(+y1.replace("%", "") + 7)}%, ${x2} ${(+y2.replace("%", "") - 7)}%, ${x2} ${y2}`;
                })
                .join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-0">
            {timeline.map((item, idx) => {
              const Icon = iconMap[item.type] || Users;
              const isLeft = idx % 2 === 0;
              const isFuture = item.type === "future";
              const cardAccent = cardAccentMap[item.type] || cardAccentMap.milestone;
              const iconBg = iconBgMap[item.type] || iconBgMap.milestone;
              const badge = badgeMap[item.type] || badgeMap.milestone;
              const dateLabel = `${item.month} ${item.year}`.trim();

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className={`relative ${
                    isLeft ? "md:col-start-1" : "md:col-start-2"
                  } ${idx === 0 ? "" : "md:mt-14"} ${idx === 1 ? "md:mt-20" : ""} mb-2 md:mb-14`}
                >
                  {/* Step number */}
                  <div
                    className={`hidden md:flex absolute top-8 z-10 w-7 h-7 rounded-full items-center justify-center text-[10px] font-black border-2 bg-theme-card text-theme-heading border-theme-card ${
                      isLeft ? "-right-3.5" : "-left-3.5"
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Date label */}
                  <p className="text-center text-sm font-semibold text-theme-heading mb-3">
                    {dateLabel}
                  </p>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`glass-panel rounded-3xl p-6 min-h-[140px] border-2 transition-all duration-300 ${cardAccent} relative`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-xl border shrink-0 ${iconBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3
                            className={`font-bold text-sm leading-tight ${
                              isFuture ? "text-blue-400" : "text-theme-heading"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <span
                            className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge}`}
                          >
                            {typeLabel[item.type] || item.type}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs font-medium text-theme-muted">{item.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-theme-body leading-relaxed">{item.description}</p>
                  </motion.div>

                  {/* Mobile flow arrow */}
                  {idx < timeline.length - 1 && (
                    <div className="flex justify-center py-4 md:hidden text-theme-subtle">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── DIVIDER ── */}
      <div className="flex items-center gap-4 mb-14">
        <div className="flex-1 h-px bg-theme-card" />
        <span className="text-[10px] font-bold text-theme-subtle uppercase tracking-widest px-2">
          Organisasi Detail
        </span>
        <div className="flex-1 h-px bg-theme-card" />
      </div>

      {/* ── ORGANIZATIONS ACCORDION ── */}
      <div className="space-y-4">
        {organizations.map((org, idx) => {
          const isOpen = expandedOrg === idx;
          return (
            <motion.div
              key={org.organization + org.role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              {/* Header row — always visible */}
              <button
                onClick={() => setExpandedOrg(isOpen ? null : idx)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                {/* Number badge */}
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-primary">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-theme-heading">{org.role}</h3>
                  </div>
                  <p className="text-xs text-primary font-semibold truncate">{org.organization}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1 text-xs text-theme-subtle">
                    <Calendar className="w-3 h-3" />
                    {org.period}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-theme-subtle">
                    <MapPin className="w-3 h-3" />
                    {org.location}
                  </div>
                  <div className={`p-1.5 rounded-lg transition-colors ${isOpen ? "bg-primary/10 text-primary" : "text-theme-subtle"}`}>
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expandable content */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-5"
                >
                  <div className="pt-3 border-t border-theme-card">
                    {/* Mobile period */}
                    <div className="sm:hidden flex items-center gap-1 text-xs text-theme-subtle mb-3">
                      <Calendar className="w-3 h-3" />
                      {org.period}
                    </div>
                    <ul className="space-y-2.5">
                      {org.bulletPoints.map((point, ptIdx) => (
                        <li
                          key={ptIdx}
                          className="flex items-start gap-2.5 text-sm text-theme-body leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
