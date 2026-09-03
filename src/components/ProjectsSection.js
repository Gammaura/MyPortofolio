"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Folder, Calendar, Sparkles, X, ArrowRight, Layers, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Github = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Front-End" },
  { id: "python-ai", label: "Python & AI" },
  { id: "game-arch", label: "Game & Architecture" },
];

function getCategoryForProject(project) {
  const title = (project.title || "").toLowerCase();
  const tech = (project.techStack || []).join(" ").toLowerCase();

  if (title.includes("game") || title.includes("ueu academy") || tech.includes("unity") || tech.includes("erd")) {
    return "game-arch";
  }
  if (tech.includes("python") || tech.includes("streamlit") || tech.includes("gemini") || tech.includes("aes-256")) {
    return "python-ai";
  }
  if (tech.includes("next.js") || tech.includes("laravel") || tech.includes("postgresql") || tech.includes("mysql") || title.includes("pos") || title.includes("certify") || title.includes("smashzone") || title.includes("esa corner")) {
    return "fullstack";
  }
  return "frontend";
}

function ProjectCard({ project, onSelect }) {
  const categoryTag = getCategoryForProject(project);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Card Top / Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-extrabold uppercase border border-indigo-200/50 dark:border-indigo-800">
            {project.role}
          </span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.period}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
          <Folder className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 4 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer Links & Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:translate-x-0.5 transition-transform"
        >
          Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({ projects = [] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeFilter === "all" || getCategoryForProject(p) === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const titleMatch = (p.title || "").toLowerCase().includes(q);
      const descMatch = (p.shortDescription || "").toLowerCase().includes(q);
      const roleMatch = (p.role || "").toLowerCase().includes(q);
      const techMatch = (p.techStack || []).some((t) => t.toLowerCase().includes(q));

      return matchesCategory && (titleMatch || descMatch || roleMatch || techMatch);
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <section id="projects" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header Intro & Metric Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Engineering Portfolio — {projects.length} Projects
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
            Eksplorasi arsitektur sistem, automasi, integrasi AI, game development, dan antarmuka interaktif yang dirancang dengan presisi teknis.
          </p>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm shrink-0">
          <div className="px-3 py-1 text-center">
            <span className="text-lg font-black text-slate-900 dark:text-white block">{projects.length}</span>
            <span className="text-[11px] font-semibold text-slate-500">Shipped Builds</span>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
          <div className="px-3 py-1 text-center">
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 block">100%</span>
            <span className="text-[11px] font-semibold text-slate-500">Modular Code</span>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
          <div className="px-3 py-1 text-center">
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block">4.9/5</span>
            <span className="text-[11px] font-semibold text-slate-500">Architecture</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60 dark:border-slate-800">
        
        {/* Category Tabs */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 gap-1 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const count = cat.id === "all" ? projects.length : projects.filter((p) => getCategoryForProject(p) === cat.id).length;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? "bg-white/20 dark:bg-slate-900/20" : "bg-slate-200 dark:bg-slate-700"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative flex-1 md:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tech stack (misal: Next.js, Python, Unity)..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors shadow-sm"
          />
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-semibold">
        <span>Menampilkan <strong className="text-slate-900 dark:text-white font-bold">{filteredProjects.length}</strong> dari {projects.length} proyek</span>
        {searchQuery && (
          <span className="text-indigo-600 dark:text-indigo-400">Kata kunci: "{searchQuery}"</span>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* CTA Collaboration Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-indigo-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-indigo-300 font-mono text-[10px] font-bold tracking-wider uppercase mb-3">
            Open for Opportunities
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Punya visi proyek atau butuh pengembang tangguh?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dari arsitektur full-stack hingga integrasi AI dan manajemen proyek IT, mari diskusikan bagaimana solusi teknis terstruktur dapat mempercepat tujuan Anda.
          </p>
        </div>
        <Link
          href="/contact"
          className="relative z-10 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0"
        >
          <span>Hubungi Saya</span>
          <ArrowRight className="w-4 h-4 text-indigo-600" />
        </Link>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 text-xs font-mono font-extrabold uppercase">
                    {selectedProject.role}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 flex items-center gap-2">
                    <Folder className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    {selectedProject.title}
                  </h2>
                  <span className="text-xs font-medium text-slate-500">{selectedProject.period}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Short Description */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {selectedProject.shortDescription}
              </p>

              {/* Bullet Points */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Highlight Pengerjaan & Deliverables:
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.bulletPoints?.map((point, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Tech Stack & Tools:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Lihat Repository Code</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-gammaura text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity ml-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Buka Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}