"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, MapPin, Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import OrganizationImageMockup from "./OrganizationImageMockup";

export default function OrganizationsSection({ timeline = [], organizations = [] }) {
  const [expandedOrg, setExpandedOrg] = useState(null);

  return (
    <section id="organizations" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header Intro (Rata Tengah & Formal) */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
          ORGANIZATIONAL EXPERIENCE
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Leadership & Activities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Track record of leadership, student governance, and developer community building.
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

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Visual Cover Photo / Mockup Banner */}
              <div className="mb-6">
                <OrganizationImageMockup
                  role={org.role}
                  organization={org.organization}
                  period={org.period}
                  image={org.image}
                />
              </div>

              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="block text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    {org.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                    {org.organization}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    {org.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
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
              Leadership & Community Impact
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Demonstrated ability in leading student communities, organizing major technical conferences, and driving collaboration.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
