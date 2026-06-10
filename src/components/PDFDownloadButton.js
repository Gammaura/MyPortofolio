"use client";

import React from "react";
import { Download } from "lucide-react";

export default function PDFDownloadButton() {
  const handleDownload = () => {
    // Open print page in a new window/tab
    window.open("/print", "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] text-sm cursor-pointer"
    >
      <Download className="w-4 h-4" />
      Unduh PDF CV
    </button>
  );
}