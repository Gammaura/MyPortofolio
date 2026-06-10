"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Calendar } from "lucide-react";

export default function OrganizationsSection({ organizations }) {
  return (
    <section id="organizations" className="py-20 relative max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Pengalaman <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Organisasi</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
          Aktivitas kepemimpinan dan kolaborasi tim di luar perkuliahan akademis.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
        {organizations.map((org, idx) => (
          <motion.div
            key={org.organization + org.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-dark-bg border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Users className="w-3 h-3 text-cyan-400" />
            </div>

            {/* Left aligned period label on medium+ screens */}
            <div className="hidden md:block absolute -left-44 top-1.5 w-32 text-right">
              <span className="text-xs font-semibold text-zinc-500">{org.period}</span>
            </div>

            {/* Card Content */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{org.role}</h3>
                  <p className="text-cyan-400 font-semibold text-sm">{org.organization}</p>
                </div>
                {/* Period for mobile screen */}
                <span className="md:hidden inline-flex items-center gap-1.5 text-xs text-zinc-500 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  {org.period}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="w-3 h-3 text-zinc-600" />
                  {org.location}
                </span>
              </div>

              {/* Bullet points detailing activities */}
              <ul className="space-y-3">
                {org.bulletPoints.map((point, ptIdx) => (
                  <li key={ptIdx} className="text-sm text-zinc-400 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}