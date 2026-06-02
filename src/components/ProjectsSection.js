"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

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

export default function ProjectsSection({ projects }) {
  // Collect all unique technologies for filtering
  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.techStack))];
  const [selectedTech, setSelectedTech] = useState("All");

  const filteredProjects =
    selectedTech === "All"
      ? projects
      : projects.filter((p) => p.techStack.includes(selectedTech));

  return (
    <section id="projects" className="py-20 relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Showcase <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Project</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
          Beberapa aplikasi, sistem, dan alat yang telah saya rancang dan kembangkan baru-baru ini.
        </p>
      </div>

      {/* Tech Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              selectedTech === tech
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105"
                : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project, idx) => (
          <motion.div
            layout
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Corner Light Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                  {project.role}
                </span>
                <span className="text-xs font-semibold text-zinc-500">{project.period}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.shortDescription}
              </p>

              {/* Bullet details */}
              <ul className="space-y-2 mb-6">
                {project.bulletPoints.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="text-xs text-zinc-500 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 mt-1.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-medium bg-zinc-900 border border-white/5 text-zinc-400 px-2 py-0.5 rounded-md"
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
      </motion.div>
    </section>
  );
}
