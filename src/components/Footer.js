import React from "react";

export default function Footer({ name }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/5 bg-zinc-950/40 text-center relative z-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
        <p>© {currentYear} {name}. All rights reserved.</p>
        <p>
          Membangun masa depan web dengan <span className="text-indigo-400">Next.js</span> & <span className="text-cyan-400">Tailwind</span>.
        </p>
      </div>
    </footer>
  );
}
