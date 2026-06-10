"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, Folder, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectsClient({ projects, profile }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [expandedImg, setExpandedImg] = useState(null);

  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.techStack))];

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
    <div className="min-h-screen grid-bg relative flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-primary/5 via-transparent to-transparent pointer-events-none z-0" />
      <Navbar />
      <main className="flex-grow relative z-10 pt-20 pb-20 max-w-5xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-semibold text-theme-heading mb-4">
            <Sparkles className="w-3 h-3 text-primary" />
            Portofolio Karya
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
            Koleksi Project Saya
          </h1>
          <p className="text-theme-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Eksplorasi aplikasi web, sistem backend, otomasi, dan desain antarmuka interaktif yang telah saya rancang dan kembangkan.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 mb-12 space-y-6">
          <div className="space-y-3">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-subtle" />
              <input
                type="text"
                placeholder="Cari project berdasarkan nama, tech stack, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-theme-badge border border-theme-badge focus:border-primary/50 text-sm text-theme-heading placeholder-theme-subtle focus:outline-none transition-colors"
              />
            </div>
            <p className="text-center text-xs font-semibold text-theme-muted">
              Menampilkan {filteredProjects.length} dari {projects.length} project
            </p>
          </div>

          <div>
            <label className="block text-center text-[10px] font-bold text-theme-subtle uppercase tracking-wider mb-3">
              Filter berdasarkan Teknologi
            </label>
            <div className="flex flex-wrap gap-2 justify-center">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTech === tech
                      ? "bg-primary/20 border-primary/50 text-primary shadow-lg"
                      : "bg-theme-badge border-theme-badge text-theme-muted hover:text-theme-heading hover:bg-primary/10"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout key={project.title}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-2xl overflow-hidden"
              >
                {/* Image Preview */}
                {project.image ? (
                  <div className="relative w-full h-48 overflow-hidden bg-theme-badge">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                      onClick={() => setExpandedImg(project.image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ) : null}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-md">{project.role}</span>
                    <span className="text-xs font-semibold text-theme-subtle">{project.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-theme-heading mb-2 flex items-center gap-2">
                    <Folder className="w-4 h-4 text-primary" />
                    {project.title}
                  </h3>
                  <p className="text-theme-muted text-sm leading-relaxed mb-6">{project.shortDescription}</p>
                  <ul className="space-y-2 mb-6">
                    {project.bulletPoints.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-xs text-theme-muted flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-medium bg-theme-badge border border-theme-badge text-theme-muted px-2.5 py-0.5 rounded-md">{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-theme-card">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-theme-heading transition-colors">
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors ml-auto">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setExpandedImg(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={expandedImg}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass-panel rounded-2xl">
            <Folder className="w-12 h-12 text-theme-subtle mx-auto mb-4" />
            <h3 className="text-lg font-bold text-theme-heading mb-2">Project Tidak Ditemukan</h3>
            <p className="text-theme-muted text-sm max-w-xs mx-auto">
              Tidak ada project yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo; atau filter teknologi &ldquo;{selectedTech}&rdquo;.
            </p>
          </motion.div>
        )}
      </main>
      <Footer name={profile.name} />
    </div>
  );
}