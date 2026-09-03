"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, MapPin, Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export default function OrganizationsSection({ timeline = [], organizations = [] }) {
  const [expandedOrg, setExpandedOrg] = useState(null);

  return (
    <section id="organizations" className="pt-28 pb-20 md:pt-36 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Leadership & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Organisasi & Kepemimpinan
          </h1>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
          Selain ngoding, saya aktif di dunia organisasi kampus. Perjalanan ini membentuk kemampuan leadership, komunikasi, dan project management secara nyata.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative mb-16 pl-6 md:pl-8 border-l-2 border-indigo-100 dark:border-indigo-950 space-y-10">
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
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 dark:border-indigo-400 shadow-sm group-hover:scale-125 transition-transform" />

            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 text-xs font-mono font-black uppercase">
                    {org.role}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {org.organization}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    {org.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    {org.location}
                  </span>
                </div>
              </div>

              {/* Achievements & Bullet Points */}
              <ul className="space-y-2.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                {org.bulletPoints.map((point, ptIdx) => (
                  <li key={ptIdx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Roadmap Summary Banner */}
      <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-gammaura flex items-center justify-center text-white shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-0.5">
              Leadership & Delivery Metric
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Terbukti meningkatkan partisipasi kegiatan mahasiswa hingga 30%+ dan mengelola eksekusi event besar secara disiplin.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
