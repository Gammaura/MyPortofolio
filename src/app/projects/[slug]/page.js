import React from "react";
import { getCVData } from "@/app/actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, CheckCircle2, Layers, Cpu, Server, ShieldCheck, Database } from "lucide-react";
import { notFound } from "next/navigation";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = await getCVData();
  const project = data.projects.find((p) => slugify(p.title) === resolvedParams.slug);

  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} — Case Study | ${data.profile.name}`,
    description: project.shortDescription,
  };
}

export default async function CaseStudyPage({ params }) {
  const resolvedParams = await params;
  const data = await getCVData();
  const project = data.projects.find((p) => slugify(p.title) === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen relative flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Proyek</span>
        </Link>

        {/* Case Study Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-xs font-mono font-extrabold uppercase">
              {project.role}
            </span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {project.shortDescription}
          </p>
        </div>

        {/* System Architecture Flow Visual */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Architecture & System Stack</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Cpu className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">Client & Presentation</div>
              <div className="text-[11px] font-medium text-slate-500">{project.techStack.slice(0, 2).join(", ")}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Server className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">Logic & Business API</div>
              <div className="text-[11px] font-medium text-slate-500">{project.role} Architecture</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">Storage & Integration</div>
              <div className="text-[11px] font-medium text-slate-500">{project.techStack.slice(-2).join(", ")}</div>
            </div>
          </div>
        </div>

        {/* Deliverables & Key Highlights */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Key Engineering Deliverables</span>
          </h2>

          <ul className="space-y-3">
            {project.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <Link
            href="/projects"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Lihat Seluruh Proyek
          </Link>
        </div>
      </main>

      <Footer name={data.profile.name} />
    </div>
  );
}
