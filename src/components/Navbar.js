"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Code, Calendar, Send, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-zinc-950/80 backdrop-blur-md border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
            A
          </div>
          <span className="font-semibold text-white tracking-wide group-hover:text-indigo-400 transition-colors">
            Adjie<span className="text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/#about" className="hover:text-white transition-colors flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Tentang
          </Link>
          <Link href="/#skills" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" /> Keahlian
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" /> Project
          </Link>
          <Link href="/#organizations" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Organisasi
          </Link>
          <Link href="/#contact" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" /> Kontak
          </Link>
        </div>

        {/* Admin Link */}
        <Link
          href="/admin"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
          Admin Panel
        </Link>
      </div>
    </nav>
  );
}
