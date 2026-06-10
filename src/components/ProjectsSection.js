"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Folder, Calendar, ImageIcon } from "lucide-react";

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectsSection({ projects = [] }) {
  const [expandedImg, setExpandedImg] = useState(null);

  return (
    <section id="projects" className="py-20 relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-semibold text-theme-heading mb-4">
          <Sparkles className="w-3 h-3 text-primary" />
          Karya Pilihan
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
          Koleksi Project
        </h2>
        <p className="text-theme-muted text-sm md:text-base max-w-lg mx-auto">
          Proyek-proyek yang telah saya kerjakan — dari akademik hingga personal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-panel rounded-2xl overflow-hidden group"
          >
            {/* Image Preview */}
            <div className="relative w-full h-48 overflow-hidden bg-theme-badge">
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    onClick={() => setExpandedImg(project.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-theme-subtle mx-auto mb-2" />
                    <p className="text-[10px] text-theme-subtle font-medium">Belum ada preview</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {project.role}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-theme-subtle">
                  <Calendar className="w-3 h-3" />
                  {project.period}
                </span>
              </div>

              <h3 className="text-lg font-bold text-theme-heading mb-2 flex items-center gap-2">
                <Folder className="w-4 h-4 text-primary shrink-0" />
                {project.title}
              </h3>

              <p className="text-theme-muted text-sm leading-relaxed mb-3">
                {project.shortDescription}
              </p>

              <ul className="space-y-1.5 mb-4">
                {project.bulletPoints.map((point, ptIdx) => (
                  <li key={ptIdx} className="text-xs text-theme-muted flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] font-medium bg-theme-badge border border-theme-badge text-theme-muted px-2 py-0.5 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-theme-card">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-theme-heading transition-colors">
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                ) : null}
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors ml-auto">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Image Modal */}
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
    </section>
  );
}