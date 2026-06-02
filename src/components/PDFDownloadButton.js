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
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.03] active:scale-[0.98] text-sm cursor-pointer"
    >
      <Download className="w-4 h-4" />
      Unduh PDF CV
    </button>
  );
}
