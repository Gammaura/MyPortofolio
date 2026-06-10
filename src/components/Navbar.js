"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Code, Calendar, Send, ShieldAlert, Briefcase, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5">
      <div
        className={`flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-black/60 backdrop-blur-xl border-white/15 shadow-lg shadow-black/30"
              : "bg-white/80 backdrop-blur-xl border-black/10 shadow-lg shadow-black/10"
            : isDark
              ? "bg-black/30 backdrop-blur-md border-white/10"
              : "bg-white/60 backdrop-blur-md border-black/5"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 mr-1 sm:mr-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            A
          </div>
          <span className={`font-semibold text-sm tracking-wide group-hover:text-indigo-400 transition-colors ${isDark ? "text-white" : "text-zinc-800"}`}>
            Adjie<span className="text-cyan-500">.dev</span>
          </span>
        </Link>

        {/* Divider */}
        <div className={`w-px h-4 ${isDark ? "bg-white/20" : "bg-black/10"}`} />

        {/* Nav Links */}
        <div className={`hidden md:flex items-center gap-4 sm:gap-5 text-xs font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
          <Link href="/#about" className={`hover:text-indigo-400 transition-colors flex items-center gap-1 ${isDark ? "hover:text-white" : ""}`}>
            <User className="w-3 h-3" /> Tentang
          </Link>
          <Link href="/#skills" className={`hover:text-indigo-400 transition-colors flex items-center gap-1 ${isDark ? "hover:text-white" : ""}`}>
            <Code className="w-3 h-3" /> Keahlian
          </Link>
          <Link href="/projects" className={`hover:text-indigo-400 transition-colors flex items-center gap-1 ${isDark ? "hover:text-white" : ""}`}>
            <Briefcase className="w-3 h-3" /> Project
          </Link>
          <Link href="/#organizations" className={`hover:text-indigo-400 transition-colors flex items-center gap-1 ${isDark ? "hover:text-white" : ""}`}>
            <Calendar className="w-3 h-3" /> Organisasi
          </Link>
          <Link href="/#contact" className={`hover:text-indigo-400 transition-colors flex items-center gap-1 ${isDark ? "hover:text-white" : ""}`}>
            <Send className="w-3 h-3" /> Kontak
          </Link>
        </div>

        {/* Divider */}
        <div className={`w-px h-4 ${isDark ? "bg-white/20" : "bg-black/10"}`} />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/15"
              : "bg-black/5 hover:bg-black/10 text-zinc-600 hover:text-zinc-800 border border-black/10"
          }`}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Admin */}
        <Link
          href="/admin"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isDark
              ? "bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-300 hover:text-white"
              : "bg-black/5 hover:bg-black/10 border border-black/10 text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <ShieldAlert className={`w-3 h-3 ${isDark ? "text-indigo-400" : "text-indigo-500"}`} />
          Admin
        </Link>
      </div>
    </nav>
  );
}