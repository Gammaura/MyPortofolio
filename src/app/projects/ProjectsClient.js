"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, ArrowLeft, Folder, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-300 mb-4 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Portofolio Karya
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Koleksi <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Project Saya</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Eksplorasi aplikasi web, sistem backend, otomasi, dan desain antarmuka interaktif yang telah saya rancang dan kembangkan.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-panel rounded-3xl p-6 mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari project berdasarkan nama, tech stack, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-950/80 border border-white/5 focus:border-indigo-500 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTech === tech
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105"
                      : "bg-zinc-950/80 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-900"
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
                className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent glow on top right */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Header info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                      {project.role}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">{project.period}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Folder className="w-4 h-4 text-indigo-400" />
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
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 mt-1.5 shrink-0" />
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
                        className="text-[10px] font-medium bg-zinc-950 border border-white/5 text-zinc-400 px-2.5 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
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
                        className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors ml-auto"
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
            className="text-center py-20 glass-panel rounded-3xl"
          >
            <Folder className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Project Tidak Ditemukan</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">
              Tidak ada project yang cocok dengan pencarian "{searchQuery}" atau filter teknologi "{selectedTech}".
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer name={profile.name} />
    </div>
  );
}
