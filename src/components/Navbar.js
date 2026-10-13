"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnLight, setIsOnLight] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync scroll on homepage
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const top = window.scrollY;
          const about = document.getElementById("about");
          const contact = document.getElementById("contact");
          const onLight = !!about && about.getBoundingClientRect().top <= 90 && (!contact || contact.getBoundingClientRect().top > 90);
          setIsOnLight(onLight);
          setIsScrolled(top > 30);
          ticking = false;
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Sync theme
  useEffect(() => {
    const isNightMode = localStorage.getItem("theme") === "night";
    if (isNightMode) {
      document.body.classList.add("night");
    } else {
      document.body.classList.remove("night");
    }
    const timer = setTimeout(() => {
      setIsNight(isNightMode);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync language
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    const timer = setTimeout(() => {
      setCurrentLang(savedLang);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const nextNight = !isNight;
    setIsNight(nextNight);
    if (nextNight) {
      document.body.classList.add("night");
      localStorage.setItem("theme", "night");
    } else {
      document.body.classList.remove("night");
      localStorage.setItem("theme", "day");
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("themechange", { detail: { isNight: nextNight } }));
    }
  };

  // Music toggle using background audio
  const toggleMusic = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== "undefined" && window.__toggleMusic) {
      window.__toggleMusic(e);
      const audio = document.querySelector("audio");
      if (audio) {
        setIsPlaying(!audio.paused);
      }
    } else {
      const audio = document.querySelector("audio");
      if (audio) {
        if (audio.paused) {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      }
    }
  };

  // Language switch
  const switchLang = (lang) => {
    setCurrentLang(lang);
    setLangMenuOpen(false);
    if (typeof window !== "undefined" && window.__setLanguage) {
      window.__setLanguage(lang);
    } else {
      localStorage.setItem("language", lang);
      if (typeof window !== "undefined" && window.location) {
        // Trigger i18n update
        const evt = new CustomEvent("languagechange", { detail: lang });
        window.dispatchEvent(evt);
      }
    }
  };

  // Close lang menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".lang-dropdown-container")) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Body scroll lock & Escape key listener for mobile sheet
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navClasses = isHome
    ? `${isScrolled ? "nav-scrolled " : ""}nav-on-dark ${isOnLight && !isNight ? "nav-on-light" : ""}`
    : "nav-on-light";

  const navItems = [
    { num: "01", label: "Home", href: "/", i18n: "navHome" },
    { num: "02", label: "Projects", href: "/projects", i18n: "navProjects" },
    { num: "03", label: "Experience", href: "/organizations", i18n: "navExperience" },
    { num: "04", label: "Skills & Certs", href: "/skills", i18n: "navSkills" },
    { num: "05", label: "Let’s connect", href: "/contact", i18n: "navContact" },
  ];

  return (
    <>
      <nav
        aria-label="Main navigation"
        suppressHydrationWarning
        className={`${navClasses} fixed inset-x-0 top-0 z-[100] flex items-center justify-between w-full px-2 sm:px-6 lg:px-12 h-[58px] sm:h-[64px] pointer-events-auto`}
      >
        {/* Brand Left (Paling Kiri - Mentok Kiri) */}
        <div className="nav-brand pointer-events-none mr-auto lg:mr-0 pl-0 ml-0" aria-label="My Portofolio">
          <Link href="/" className="nav-brand-text pointer-events-auto pl-0 ml-0">
            My Portofolio
          </Link>
        </div>

        {/* Center Pill / Links (hidden on mobile, inside mobile drawer) */}
        <div className="nav-pill hidden lg:flex pointer-events-auto">
          <div className="nav-links flex items-center gap-8 overflow-visible pr-2">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
              aria-current={pathname === "/" ? "page" : undefined}
              data-i18n="navHome"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`nav-link ${pathname === "/projects" ? "active" : ""}`}
              aria-current={pathname === "/projects" ? "page" : undefined}
              data-i18n="navProjects"
            >
              Projects
            </Link>
            <Link
              href="/organizations"
              className={`nav-link ${pathname === "/organizations" ? "active" : ""}`}
              aria-current={pathname === "/organizations" ? "page" : undefined}
              data-i18n="navExperience"
            >
              Experience
            </Link>
            <Link
              href="/skills"
              className={`nav-link ${pathname === "/skills" ? "active" : ""}`}
              aria-current={pathname === "/skills" ? "page" : undefined}
              data-i18n="navSkills"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
              aria-current={pathname === "/contact" ? "page" : undefined}
              data-i18n="navContact"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right Controls (Paling Kanan - Mentok Kanan) */}
        <div className="nav-controls flex flex-shrink-0 items-center justify-end gap-2 ml-auto lg:ml-0 pr-0 mr-0 pointer-events-auto">
          {/* Music Button */}
          <button
            type="button"
            className={`music-toggle-btn ${isPlaying ? "is-playing" : ""}`}
            aria-label={isPlaying ? "Jeda Musik / Pause Music" : "Putar Musik / Play Music"}
            title={isPlaying ? "Jeda Musik / Pause Music" : "Putar Musik / Play Music"}
            onClick={toggleMusic}
          >
            <svg
              className="music-icon-idle"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="currentColor"
              style={{ transform: "translateX(1px)" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="music-icon-playing">
              <span className="music-wave-bar"></span>
              <span className="music-wave-bar"></span>
              <span className="music-wave-bar"></span>
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            aria-label="Toggle day / night theme"
            className="theme-toggle-btn relative h-9 w-9 overflow-hidden rounded-full border border-white/20 shadow-sm transition-transform hover:scale-105 active:scale-95"
            style={{ background: isNight ? "#0c1b42" : "#ffffff" }}
            onClick={toggleTheme}
          >
            <svg
              viewBox="0 0 24 24"
              className={`sun-icon absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-[#f5a623] ${
                isNight ? "hidden" : ""
              }`}
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={`moon-icon absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#f2ead6] ${
                isNight ? "" : "hidden"
              }`}
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          {/* Mobile Menu Toggle (3 Garis) */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Modern High-Craft Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="mobile-nav-sheet"
        >
          {/* Top Bar */}
          <div className="mobile-nav-top">
            <div className="mobile-nav-brand-badge">
              <span className="pulse-dot"></span>
              <span>Menu</span>
            </div>
            <button
              type="button"
              className="mobile-nav-close-btn"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Links List */}
          <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-item ${isActive ? "is-active" : ""}`}
                >
                  <div className="mobile-nav-item-left">
                    <span className="mobile-nav-num">{item.num}</span>
                    <span className="mobile-nav-label" data-i18n={item.i18n}>
                      {item.label}
                    </span>
                  </div>
                  <span className="mobile-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Bar: Status + Quick Socials */}
          <div className="mobile-nav-bottom">
            <div className="mobile-nav-status-row">
              <span className="mobile-nav-status-pill">
                <i></i> <span data-i18n="mobileStatus">Available for work</span>
              </span>
              <span>TANGERANG, INDONESIA</span>
            </div>

            <div className="mobile-nav-socials">
              <a
                href="https://github.com/Gammaura"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-social-btn"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/adjie-garmada"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-social-btn"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="mailto:adjiegarmada@gmail.com"
                className="mobile-nav-social-btn"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a
                href="https://wa.me/62895325690644"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-social-btn"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.165 8.165 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.59.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.18-.48-.31z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
