import React from "react";

export default function Footer({ name }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-300 dark:border-slate-800 text-center relative z-10 bg-slate-100/80 dark:bg-slate-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
        <p>© {currentYear} {name || "Arditya Adjie Rosandi"}. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <span className="font-extrabold text-slate-900 dark:text-white">Next.js 14</span>
          <span>&</span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}