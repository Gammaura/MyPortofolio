"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Database, Brain, Wrench, ArrowRight } from "lucide-react";

const skillClusters = [
  {
    title: "Full-Stack Web Engineering",
    icon: Code,
    desc: "Responsive frontend architecture & tested backend systems.",
    skills: ["Next.js", "React", "Laravel 11", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    title: "Database & Backend Systems",
    icon: Database,
    desc: "Relational schema design, query optimization, and REST APIs.",
    skills: ["PostgreSQL (Neon)", "MySQL", "MariaDB", "RESTful API"],
  },
  {
    title: "AI & Python Engineering",
    icon: Brain,
    desc: "Contextual LLM integrations & applied machine learning workflows.",
    skills: ["Python", "Streamlit", "Google Gemini API", "Random Forest", "Naive Bayes"],
  },
  {
    title: "Project Delivery & Tools",
    icon: Wrench,
    desc: "Git-flow discipline, UI/UX prototyping, and agile team coordination.",
    skills: ["Git & GitHub", "Figma", "Agile / Scrum", "Documentation"],
  },
];

export default function HomeSkillsSection({ certificates = [] }) {
  return (
    <section id="featured-skills" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header (Rata Tengah) */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
          SKILLS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Skills & Competencies
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Core technical capabilities across modern web development, databases, and AI systems.
        </p>
      </div>

      {/* Bento Grid 4 Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {skillClusters.map((cluster, idx) => {
          const IconComp = cluster.icon;

          return (
            <motion.div
              key={cluster.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {cluster.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-medium">
                  {cluster.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                {cluster.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Certification & Catalog Fast Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-mono font-bold uppercase border border-blue-400/20">
              VERIFIED CREDENTIALS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
            Certifications & Training Licenses
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-medium">
            Official certifications, technical training credentials, and academic achievements available for verification.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all group"
          >
            <span>View All Certifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}
