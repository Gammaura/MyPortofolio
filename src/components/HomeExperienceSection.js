"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import OrganizationImageMockup from "./OrganizationImageMockup";

export default function HomeExperienceSection({ organizations = [] }) {
  // Show top 3 leadership roles on the homepage
  const highlightOrgs = organizations.slice(0, 3);

  return (
    <section id="featured-experience" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header (Rata Tengah) */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
          EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Organizational Experience
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Active leadership roles, organizational governance, and student community initiatives.
        </p>
      </div>

      {/* Grid of Highlight Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {highlightOrgs.map((org, idx) => (
          <motion.div
            key={org.organization + org.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Visual Cover Photo / Mockup Banner */}
              <div className="mb-5">
                <OrganizationImageMockup
                  role={org.role}
                  organization={org.organization}
                  period={org.period}
                  image={org.image}
                />
              </div>

              {/* Meta Role & Period */}
              <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {org.role}
                </span>
                <span className="text-[11px] text-slate-400">
                  {org.period}
                </span>
              </div>

              {/* Org Name & Location */}
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {org.organization}
              </h3>

              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-4">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{org.location}</span>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5">
                {org.bulletPoints.slice(0, 3).map((bp, bpIdx) => (
                  <li key={bpIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Footer Link */}
            <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Governance & Leadership</span>
              <Link
                href="/organizations"
                className="inline-flex items-center gap-1 font-extrabold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Center CTA */}
      <div className="flex justify-center mt-6">
        <Link
          href="/organizations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm hover:shadow-md transition-all group"
        >
          <span>View All Experience</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
