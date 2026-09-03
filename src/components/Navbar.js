"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Code, Briefcase, Calendar, Mail, Sun, Moon, Menu, X, Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "Tentang", icon: User },
  { href: "/skills", label: "Keahlian", icon: Code },
  { href: "/projects", label: "Project", icon: Briefcase },
  { href: "/organizations", label: "Organisasi", icon: Calendar },
  { href: "/contact", label: "Kontak", icon: Mail },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDark = theme === "dark";

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pt-4 pointer-events-none">
        <div className="h-16 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center">
          <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border border-slate-300/80 dark:border-slate-800 transition-all duration-300">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 pl-1 pr-2 group focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Gammaura
              </span>
            </Link>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none"
                type="button"
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none"
                type="button"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Floating Dropdown */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-20 z-40 mx-4 p-3 rounded-2xl border bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-indigo-500" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
