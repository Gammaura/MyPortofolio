"use client";

import React from "react";
import { Download } from "lucide-react";

export default function PDFDownloadButton({ variant = "default" }) {
  const handleDownload = () => {
    window.open("/print", "_blank");
  };

  const isHero = variant === "hero";

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] text-sm cursor-pointer ${
        isHero
          ? "hero-glass hero-text-heading hover:bg-white/15"
          : "glass-light text-theme-heading"
      }`}
    >
      <Download className="w-4 h-4" />
      Unduh PDF CV
    </button>
  );
}