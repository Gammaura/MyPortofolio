"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, MapPin, Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export default function OrganizationsSection({ timeline = [], organizations = [] }) {
  const [expandedOrg, setExpandedOrg] = useState(null);

  return (
    <section id="organizations" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              LEADERSHIP & GOVERNANCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Organisasi & Kepemimpinan
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed font-medium">
          Selain rekayasa perangkat lunak, saya aktif memimpin organisasi kampus untuk mengasah kemampuan komunikasi, tata kelola tim, dan kepemimpinan agile secara nyata.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative mb-12 pl-6 md:pl-8 border-l-2 border-slate-300 dark:border-slate-800 space-y-8">
        {organizations.map((org, idx) => (
          <motion.div
            key={org.organization + org.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Node Disk */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-600 dark:border-blue-400 shadow-sm group-hover:scale-125 transition-transform" />

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-xs font-mono font-extrabold uppercase">
                    {org.role}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {org.organization}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    {org.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    {org.location}
                  </span>
                </div>
              </div>

              {/* Achievements & Bullet Points */}
              <ul className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                {org.bulletPoints.map((point, ptIdx) => (
                  <li key={ptIdx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leadership Metric Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-0.5">
              Leadership & Delivery Impact
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Terbukti meningkatkan partisipasi kegiatan mahasiswa hingga 30%+ dan mengelola eksekusi event besar secara disiplin.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
