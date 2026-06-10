"use client";

import React from "react";
import Image from "next/image";
import { Award, FileText } from "lucide-react";

export function getCertificateFile(cert) {
  return cert?.file || cert?.image || "";
}

export function getCertificateType(cert) {
  if (cert?.fileType) return cert.fileType;
  const file = getCertificateFile(cert);
  if (file.toLowerCase().endsWith(".pdf")) return "pdf";
  if (file) return "image";
  return null;
}

export default function CertificatePreview({ cert, className = "", interactive = true }) {
  const file = getCertificateFile(cert);
  const type = getCertificateType(cert);

  if (!file) {
    return (
      <div className={`flex items-center justify-center bg-theme-badge text-theme-subtle ${className}`}>
        <Award className="w-10 h-10 opacity-40" />
      </div>
    );
  }

  if (type === "pdf") {
    return (
      <div className={`relative bg-theme-badge overflow-hidden ${className}`}>
        <iframe
          src={`${file}#toolbar=0&navpanes=0&scrollbar=0`}
          title={cert.title}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 text-white text-[10px] font-semibold">
          <FileText className="w-3 h-3" />
          PDF
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-theme-badge overflow-hidden ${className}`}>
      <Image
        src={file}
        alt={cert.title}
        fill
        unoptimized
        className={`object-cover ${interactive ? "transition-transform duration-300 group-hover:scale-105" : ""}`}
      />
    </div>
  );
}
