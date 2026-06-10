"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Code, Briefcase, Calendar, Send, ShieldAlert, Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "Tentang", icon: User },
  { href: "/skills", label: "Keahlian", icon: Code },
  { href: "/projects", label: "Project", icon: Briefcase },
  { href: "/organizations", label: "Organisasi", icon: Calendar },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDark = theme === "dark";
  const isHome = pathname === "/";

  const navClass = scrolled
    ? isDark
      ? "bg-zinc-950/80 backdrop-blur-xl border-white/15 shadow-lg shadow-black/30"
      : "bg-white/80 backdrop-blur-xl border-black/10 shadow-lg shadow-black/10"
    : isDark
      ? "bg-zinc-950/40 backdrop-blur-md border-white/10"
      : "bg-white/60 backdrop-blur-md border-black/5";

  const linkClass = (href) =>
    `relative flex items-center gap-1.5 text-xs font-medium transition-colors ${
      pathname === href
        ? isDark ? "text-white" : "text-zinc-900"
        : isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-800"
    }`;

  const activeIndicator = (href) =>
    pathname === href ? (
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
    ) : null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-5 px-4">
        <div className={`flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-full border transition-all duration-300 ${navClass}`}>
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 mr-1 sm:mr-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              A
            </div>
            <span className={`font-semibold text-sm tracking-wide group-hover:text-primary transition-colors ${isDark ? "text-white" : "text-zinc-800"}`}>
              Adjie<span className="text-primary">.dev</span>
            </span>
          </Link>

          {/* Divider */}
          <div className={`w-px h-4 ${isDark ? "bg-white/15" : "bg-black/10"}`} />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                <item.icon className="w-3 h-3" />
                {item.label}
                {activeIndicator(item.href)}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className={`hidden md:block w-px h-4 ${isDark ? "bg-white/15" : "bg-black/10"}`} />

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all cursor-pointer ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/10"
                  : "bg-black/5 hover:bg-black/10 text-zinc-500 hover:text-zinc-800 border border-black/5"
              }`}
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            </button>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isDark
                  ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                  : "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Hubungi Saya
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all cursor-pointer ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-zinc-300 border border-white/10"
                  : "bg-black/5 hover:bg-black/10 text-zinc-500 border border-black/5"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`fixed inset-x-0 top-20 z-40 mx-4 p-4 rounded-2xl border backdrop-blur-xl transition-all ${
          isDark
            ? "bg-zinc-950/90 border-white/10 shadow-xl shadow-black/50"
            : "bg-white/90 border-black/10 shadow-xl shadow-black/10"
        } md:hidden`}>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === item.href
                    ? isDark
                      ? "bg-white/10 text-white"
                      : "bg-black/5 text-zinc-900"
                    : isDark
                      ? "text-zinc-400 hover:bg-white/5 hover:text-white"
                      : "text-zinc-500 hover:bg-black/5 hover:text-zinc-800"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {pathname === item.href && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
            <div className={`h-px my-1 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
            <Link
              href="/contact"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Hubungi Saya
            </Link>
          </div>
        </div>
      )}
    </>
  );
}