"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Folder, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

function ProjectImage({ project }) {
  const getPreviewUrl = () => {
    if (project.image) return project.image;
    return null;
  };

  const src = getPreviewUrl();

  if (!src) {
    return (
      <div className="w-full h-48 bg-theme-badge flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, rgba(220,38,38,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <Folder className="w-10 h-10 text-primary/30" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 overflow-hidden bg-theme-badge">
      <img
        src={src}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.classList.add("flex", "items-center", "justify-center");
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="glass-panel rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Image */}
          <ProjectImage project={project} />

          <div className="p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {project.role}
                </span>
                <h2 className="text-2xl font-bold text-theme-heading mt-3 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-primary" />
                  {project.title}
                </h2>
                <p className="text-xs text-theme-subtle mt-1">{project.period}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-theme-subtle hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-theme-muted text-sm leading-relaxed mb-5">
              {project.shortDescription}
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2.5 mb-6">
              {project.bulletPoints.map((bullet, i) => (
                <li key={i} className="text-sm text-theme-body flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-[10px] font-medium bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-md">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-theme-card">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-theme-muted hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors ml-auto"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsClient({ projects, profile }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen grid-bg relative flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-primary/5 via-transparent to-transparent pointer-events-none z-0" />
      <Navbar />

      <main className="flex-grow relative z-10 pt-28 pb-20 max-w-5xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-theme-heading tracking-tight">
            My Projects
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(project)}
              className="glass-panel rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/30 transition-colors"
            >
              <ProjectImage project={project} />

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                    {project.role}
                  </span>
                  <span className="text-xs font-semibold text-theme-subtle">{project.period}</span>
                </div>

                <h3 className="text-lg font-bold text-theme-heading mb-2 flex items-center gap-2">
                  <Folder className="w-4 h-4 text-primary" />
                  {project.title}
                </h3>

                <p className="text-theme-muted text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] font-medium bg-theme-badge border border-theme-badge text-theme-muted px-2 py-0.5 rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-medium bg-theme-badge border border-theme-badge text-theme-muted px-2 py-0.5 rounded-md">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-theme-card">
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-primary/60 group-hover:text-primary transition-colors font-medium">
                    Lihat Detail →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer name={profile.name} />

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
