"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, ArrowRight, Folder } from "lucide-react";
import Link from "next/link";

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
  // Only display the first 2 projects as featured projects on homepage
  const featuredProjects = projects.slice(0, 2);

  return (
    <section id="projects" className="py-20 relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-300 mb-4 uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          Karya Pilihan
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
          Highlight beberapa aplikasi utama yang telah saya rancang dan kembangkan baru-baru ini.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
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
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Folder className="w-4 h-4 text-indigo-400" />
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
                    className="text-[10px] font-medium bg-zinc-950 border border-white/5 text-zinc-400 px-2 py-0.5 rounded-md"
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
      </div>

      {/* CTA Button to All Projects */}
      <div className="flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-indigo-500/30 text-sm font-bold text-white rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer"
        >
          Lihat Semua Project
          <ArrowRight className="w-4 h-4 text-indigo-400" />
        </Link>
      </div>
    </section>
  );
}
