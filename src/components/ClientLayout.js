"use client";

import React, { useEffect } from "react";
import ThemeProvider from "./ThemeProvider";

function CursorAndAudioManager() {
  useEffect(() => {
    // 1. Initial theme class on body
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "night") {
      document.body.classList.add("night");
    } else {
      document.body.classList.remove("night");
    }

    // 2. Smooth scrolling for internal anchor links (#about, #projects, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href*="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      try {
        const url = new URL(target.href, window.location.href);
        if (url.pathname === window.location.pathname && url.hash) {
          const el = document.querySelector(url.hash);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", url.hash);
          }
        }
      } catch {
        // Fallback
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <audio id="bg-music" src="/music.mp3" preload="none" loop />
  );
}

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <CursorAndAudioManager />
      {children}
    </ThemeProvider>
  );
}