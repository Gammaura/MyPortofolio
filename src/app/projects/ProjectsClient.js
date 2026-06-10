"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, ArrowLeft, Folder, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Github = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectsClient({ projects, profile }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");

  // Collect all unique technologies for filtering
  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.techStack))];

  // Filter projects by both search query and selected technology badge
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTech = selectedTech === "All" || project.techStack.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen grid-bg relative flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Navbar */}
      <Navbar />

      <main className="flex-grow relative z-10 pt-36 pb-20 max-w-5xl mx-auto px-6 w-full">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white mb-4">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            Portofolio Karya
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Koleksi <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">Project Saya</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Eksplorasi aplikasi web, sistem backend, otomasi, dan desain antarmuka interaktif yang telah saya rancang dan kembangkan.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-panel rounded-2xl p-6 mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari project berdasarkan nama, tech stack, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-cyan-500/50 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Project Count Indicator */}
            <div className="flex items-center justify-end text-xs font-semibold text-zinc-500">
              Menampilkan {filteredProjects.length} dari {projects.length} project
            </div>
          </div>

          {/* Tech Stack Badges Filter */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
              Filter berdasarkan Teknologi
            </label>
            <div className="flex flex-wrap gap-2">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTech === tech
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-lg"
                      : "bg-white/10 border-white/10 text-zinc-400 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent glow on top right */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Header info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-cyan-300 bg-white/10 px-2.5 py-1 rounded-md">
                      {project.role}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">{project.period}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Folder className="w-4 h-4 text-cyan-400" />
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-6">
                    {project.bulletPoints.map((bullet, bulletIdx) => (
                      <li
                        key={bulletIdx}
                        className="text-xs text-zinc-500 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium bg-white/10 border border-white/10 text-zinc-400 px-2.5 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors ml-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 glass-panel rounded-2xl"
          >
            <Folder className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Project Tidak Ditemukan</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">
              Tidak ada project yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo; atau filter teknologi &ldquo;{selectedTech}&rdquo;.
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer name={profile.name} />
    </div>
  );
}