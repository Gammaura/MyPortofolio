"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectsClient({ projects, profile }) {
  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: "var(--page-bg, #fff9f1)", color: "var(--page-ink, #17201c)" }}>
      <Navbar />
      <main className="flex-grow cream-page" style={{ paddingTop: "110px", paddingBottom: "60px" }}>
        <div className="cream-page-inner">
          <div className="page-kicker">
            <span><i></i> 01 / SELECTED WORK & ARCHIVE</span>
            <span>{projects?.length || 15} TOTAL PROJECTS</span>
          </div>
          <h1 className="page-title" data-i18n="pageProjectsTitle">
            Featured Projects & Systems.
          </h1>
          <p className="page-subtitle" data-i18n="pageProjectsSub">
            Kompilasi lengkap seluruh proyek web skala produksi, arsitektur Multi-Agent AI, aplikasi kasir hybrid, dan sistem informasi yang telah saya kembangkan.
          </p>

          <div className="archive-grid">
            {projects?.map((p) => (
              <div className="archive-card" key={p.title}>
                {p.image && (
                  <div className="archive-card-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                )}
                <div className="archive-card-content">
                  <h3>{p.title}</h3>
                  <p>{p.shortDescription}</p>
                  {p.bulletPoints && p.bulletPoints.length > 0 && (
                    <ul className="archive-bullets">
                      {p.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  )}
                  {p.techStack && (
                    <div className="archive-tags">
                      {p.techStack.map((tag) => (
                        <span key={tag} className="archive-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="archive-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer name={profile?.name} />
    </div>
  );
}
