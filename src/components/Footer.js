import React from "react";

export default function Footer({ name }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-theme-card text-center relative z-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted font-medium">
        <p>© {currentYear} {name}. All rights reserved.</p>
        <p>
          Dibangun dengan <span className="text-primary">Next.js</span> & <span className="text-accent">Tailwind</span>.
        </p>
      </div>
    </footer>
  );
}