"use client";

import React, { useState, useEffect, useRef } from "react";
import CloudShader from "./CloudShader";

export default function XavieraPortfolio({ data }) {
  const profile = data?.profile || {
    name: "Arditya Adjie Rosandi",
    title: "Full-Stack Developer & IT Project Manager",
    location: "TANGERANG, ID",
    about: "Mahasiswa Teknik Informatika Universitas Esa Unggul dengan IPK 3.84, berspesialisasi dalam full-stack development dan IT project management. Membangun aplikasi produksi, memimpin tim, dan mengeksekusi proyek dari konsep hingga deployment.",
    email: "ardityaa.id@gmail.com",
    linkedin: "https://www.linkedin.com/in/ardityaadjierosandi",
    github: "https://github.com/Gammaura",
    phone: "+62 877-1795-6553"
  };

  // State
  const [isNight, setIsNight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Audio ref
  const audioRef = useRef(null);
  const sliderRef = useRef(null);
  const scrambleRef = useRef(null);

  const rollWords = ["Builds", "Codes", "Ships", "Solves"];

  // Custom Cursor
  useEffect(() => {
    const match = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!match.matches) return;

    const cursor = document.createElement("div");
    cursor.className = "design-cursor";
    cursor.setAttribute("aria-hidden", "true");

    const ring = document.createElement("span");
    ring.className = "design-cursor-ring";

    const dot = document.createElement("span");
    dot.className = "design-cursor-dot";

    cursor.append(ring, dot);
    document.body.append(cursor);

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    function hide() {
      cancelAnimationFrame(rafId);
      rafId = 0;
      cursor.dataset.visible = "false";
      delete cursor.dataset.pressed;
      document.documentElement.classList.remove("design-cursor-active");
    }

    function onPointerMove(e) {
      if ("mouse" !== e.pointerType) return hide();
      const target = e.target instanceof Element ? e.target : null;
      if (!target || target.closest("input, textarea, select, [contenteditable='true']")) {
        return hide();
      }
      const container = target.closest("dialog[open]") || document.body;
      if (cursor.parentElement !== container) {
        container.append(cursor);
      }
      cursor.dataset.interactive = String(
        !!target.closest("a, button, [role='button'], #play-slider, .recorder, .h-letter, .project-preview")
      );
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          cursor.dataset.visible = "true";
          document.documentElement.classList.add("design-cursor-active");
        });
      }
    }

    function onPointerDown() {
      cursor.dataset.pressed = "true";
    }

    function onPointerUp() {
      delete cursor.dataset.pressed;
    }

    function onKeyDown(e) {
      if (e.key === "Tab") hide();
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("keydown", onKeyDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide, { passive: true });

    return () => {
      hide();
      cursor.remove();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  // Theme Toggle effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "night") {
      setIsNight(true);
      document.body.classList.add("night");
    }
  }, []);

  const toggleTheme = () => {
    setIsNight((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("night");
        localStorage.setItem("theme", "night");
      } else {
        document.body.classList.remove("night");
        localStorage.setItem("theme", "day");
      }
      return next;
    });
  };

  // Word Roll effect with original Xaviera Web Animations API
  useEffect(() => {
    const scrambleEl = scrambleRef.current;
    if (!scrambleEl) return;
    const words = Array.from(scrambleEl.querySelectorAll(".roll-word"));
    if (!words.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let currIdx = 0;
    let anims = [];
    let isDestroyed = false;

    function applyState() {
      words.forEach((w, t) => {
        w.style.opacity = t === currIdx ? "1" : "0";
        w.style.transform = t === currIdx ? "translateY(0)" : "translateY(100%)";
      });
      anims.forEach((a) => a.cancel());
      anims = [];
    }

    function rollNext() {
      if (isDestroyed || reducedMotion.matches || document.hidden) return;
      const nextIdx = (currIdx + 1) % words.length;
      const config = {
        duration: 600,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards"
      };
      anims = [
        words[currIdx].animate(
          [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-100%)", opacity: 0 }
          ],
          config
        ),
        words[nextIdx].animate(
          [
            { transform: "translateY(100%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 }
          ],
          config
        )
      ];

      Promise.all(anims.map((a) => a.finished))
        .then(() => {
          if (!isDestroyed) {
            currIdx = nextIdx;
            applyState();
            timer = setTimeout(rollNext, 1600);
          }
        })
        .catch(() => {});
    }

    applyState();
    if (!reducedMotion.matches && !document.hidden) {
      timer = setTimeout(rollNext, 1600);
    }

    function handleVisibility() {
      clearTimeout(timer);
      applyState();
      if (!reducedMotion.matches && !document.hidden) {
        timer = setTimeout(rollNext, 1600);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isDestroyed = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  // Audio handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  const handleSliderClick = (e) => {
    const slider = sliderRef.current;
    const audio = audioRef.current;
    if (!slider || !audio || !duration) return;

    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs <= 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const audioProgressPct = duration ? (currentTime / duration) * 100 : 0;

  // Projects data
  const featuredProjects = [
    {
      id: "velora-studio",
      number: "01",
      badge: "FEATURED",
      category: "FULL-STACK / WEB PLATFORM",
      roleBadge: "LEAD DEV → PRODUCTION",
      title: "Velora Studio",
      tagline: "Platform booking self-photo studio & kelas terintegrasi Midtrans.",
      themeColor: "lavender",
      summary: "Platform booking self photo studio & kelas terintegrasi dengan gateway pembayaran Midtrans, penyimpanan AWS S3, dan tiket digital QR Code.",
      roleText: "Lead Full-Stack Developer",
      ideaText: "Mengotomasi seluruh proses pemesanan studio foto, mulai dari pemilihan jadwal real-time anti double-booking hingga konfirmasi pembayaran otomatis tanpa campur tangan admin manual.",
      approachText: "Menggabungkan Next.js 14 App Router, PostgreSQL dengan Prisma ORM untuk proteksi konkurensi booking, Midtrans Snap & Webhook untuk konfirmasi instan, serta Resend untuk e-ticket QR Code otomatis.",
      techStack: ["Next.js 14", "Prisma ORM", "PostgreSQL", "NextAuth", "Midtrans", "AWS S3", "Resend", "Framer Motion"],
      demoUrl: "https://velorastudio.id",
      githubUrl: "https://github.com/Gammaura/Velora",
      points: [
        "Sistem pemesanan sesi kelas & studio real-time dengan proteksi double-booking berbasis Prisma ORM & PostgreSQL.",
        "Integrasi gateway pembayaran otomatis Midtrans (QRIS, VA, E-Wallet) dan webhook untuk validasi pembayaran instan.",
        "Sistem check-in tiket digital dengan QR code scanner dan notifikasi email transaksional via Resend."
      ]
    },
    {
      id: "asdoku",
      number: "02",
      badge: "AI & NLP",
      category: "AI & NLP / MULTI-AGENT SYSTEM",
      roleBadge: "LEAD AI & FULL-STACK",
      title: "Asdoku",
      tagline: "Multi-Agent AI & IndoBERT untuk format dokumen skripsi Word (.docx) otomatis.",
      themeColor: "peach",
      summary: "Sistem Multi-Agent AI terintegrasi untuk mendeteksi dan merapikan format dokumen skripsi & akademik Word (.docx) secara otomatis sesuai pedoman kampus.",
      roleText: "Lead AI & Full-Stack Engineer",
      ideaText: "Menyelesaikan masalah mahasiswa dan akademisi yang menghabiskan waktu berjam-jam hanya untuk menyesuaikan format margin, heading bab, penomoran tabel, dan gaya sitasi APA pada Word.",
      approachText: "Membangun arsitektur Multi-Agent System (Coordinator, Parser, Detection Agent, Formatting Agent) didukung model NLP IndoBERT untuk klasifikasi struktur bab dengan tingkat akurasi tinggi.",
      techStack: ["Next.js 16", "React 19", "Python", "FastAPI", "IndoBERT", "Multi-Agent System", "Tailwind CSS v4"],
      demoUrl: "https://asdoku.id",
      githubUrl: "https://github.com/Gammaura/Asdoku",
      points: [
        "Arsitektur Multi-Agent System (MAS Coordinator, Document Parser, Detection, Formatting) dengan feedback loop presisi.",
        "Model NLP IndoBERT terlatih khusus untuk klasifikasi struktur heading, penomoran tabel/gambar per bab, dan sitasi APA.",
        "Antarmuka Next.js 16 modern untuk unggah dokumen, peninjauan heading otomatis, dan pratinjau canvas Word sebelum ekspor."
      ]
    },
    {
      id: "velora-pos",
      number: "03",
      badge: "MOBILE HYBRID",
      category: "MOBILE & HYBRID / POINT OF SALE",
      roleBadge: "FULL-STACK & MOBILE",
      title: "Velora POS",
      tagline: "Aplikasi Point of Sale hybrid web/mobile untuk manajemen kasir & stok real-time.",
      themeColor: "blue",
      summary: "Aplikasi Point of Sale (POS) kasir hybrid web/mobile untuk manajemen transaksi meja, takeaway, dan pergerakan stok real-time.",
      roleText: "Full-Stack & Mobile Developer",
      ideaText: "Memberikan solusi kasir tablet modern yang cepat, ringan, responsif, dan dapat dioperasikan secara offline-ready maupun sinkronisasi cloud real-time bagi operasional bisnis studio & kafe.",
      approachText: "Menggunakan Next.js 16 yang diintegrasikan dengan Capacitor untuk kompilasi native Android & iOS, dilengkapi alur pesanan meja, split-bill, dan keep-awake mode pada perangkat kasir.",
      techStack: ["Next.js 16", "React 19", "Prisma ORM", "PostgreSQL", "Capacitor", "Android", "iOS", "NextAuth"],
      demoUrl: "",
      githubUrl: "https://github.com/Gammaura/pos-velora",
      points: [
        "Sistem transaksi kasir interaktif dengan alur meja & takeaway, kalkulasi keranjang dinamis, dan pencatatan pergerakan stok.",
        "Integrasi Capacitor untuk deployment lintas platform native (Android & iOS) dengan fitur keep-awake tablet kasir.",
        "Autentikasi multi-kasir dengan struk transaksi dan dashboard rekapitulasi penjualan harian."
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[var(--work-bg)] text-[var(--work-ink)] overflow-x-hidden">
      {/* Audio Element */}
      <audio ref={audioRef} src="/music.mp3" preload="metadata" />

      {/* NAVBAR */}
      <nav aria-label="Main navigation" className="nav-on-dark fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[60px] pt-6 max-[820px]:px-5">
        {/* Left: Location */}
        <div className="flex w-[160px] items-center gap-2 text-[16px] leading-[1.358] text-[var(--cream-text)] transition-colors duration-350">
          <img alt="" width="14" height="20" className="brightness-0 invert" src="/assets/imgVector.svg" />
          <span className="whitespace-nowrap tracking-tight font-jetbrains-mono text-[13px]">{profile.location || "TANGERANG, ID"}</span>
        </div>

        {/* Center: Nav Pill */}
        <div className="nav-pill flex h-14 max-w-[680px] items-center rounded-full border border-white/50 bg-white/20 px-2 shadow-[inset_0_4px_6px_rgba(255,255,255,0.25)] backdrop-blur-md transition-[gap] duration-450 ease-[cubic-bezier(0.4,0,0.2,1)] gap-[50px]">
          {/* Avatar */}
          <div className="flex flex-shrink-0 items-center gap-1">
            <a href="#" aria-label="Home" className="relative block h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-white/40 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] active:scale-95">
              <img alt={profile.name} className="object-cover h-full w-full" src="/assets/photo.png" />
            </a>
          </div>

          {/* Available for work badge */}
          <div className="flex items-center overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin-left] duration-450 ease-[cubic-bezier(0.4,0,0.2,1)] -ml-[50px] max-w-0 opacity-0 min-[1100px]:max-w-[190px] min-[1100px]:ml-0 min-[1100px]:opacity-100">
            <span className="pr-2 font-sans text-[14px] text-white font-medium">Available for work</span>
          </div>
          <span className="relative h-[8px] w-[8px] flex-shrink-0 rounded-full bg-[var(--gold)] transition-[opacity,margin] duration-450 opacity-100">
            <span className="absolute -inset-1 rounded-full border-2 border-[var(--gold)] animate-[avail-pulse_1.8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
          </span>

          {/* Links */}
          <div className="flex flex-shrink-0 items-center gap-3 overflow-visible transition-[max-width,opacity] duration-450 ease-[cubic-bezier(0.4,0,0.2,1)] max-w-[680px] opacity-100">
            <a href="#work" className="nav-link whitespace-nowrap rounded-full border border-transparent px-[10px] py-2 text-[15px] text-white/80 transition-colors hover:border-white">Work</a>
            <a href="#about" className="nav-link whitespace-nowrap rounded-full border border-transparent px-[10px] py-2 text-[15px] text-white/80 transition-colors hover:border-white">About</a>
            <a href="#skills" className="nav-link whitespace-nowrap rounded-full border border-transparent px-[10px] py-2 text-[15px] text-white/80 transition-colors hover:border-white">Skills</a>
            <a href="#contact" className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-[15px] font-medium text-black transition-[transform,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:shadow-[0_4px_12px_-4px_rgba(30,58,95,0.4)] active:scale-[0.97]">
              <img alt="" width="20" height="20" src="/assets/imgEmail.svg" />
              Let’s talk
            </a>
          </div>
        </div>

        {/* Right: Audio Toggle & Theme Toggle & Mobile Menu */}
        <div className="flex w-[160px] flex-shrink-0 items-center justify-end gap-2">
          {/* Music Play/Pause Navbar Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title="Sekian, Terima Kasih — Lealona & The Jeblogs"
            className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.10)] transition-transform hover:scale-[1.08] active:scale-[0.94]"
          >
            <svg viewBox="0 0 40 40" fill="none" className="h-full w-full" aria-hidden="true">
              <path
                d="M-20 20 C -17.5 11.1 -12.5 11.1 -10 20 C -7.5 28.9 -2.5 28.9 0 20 C 2.5 11.1 7.5 11.1 10 20 C 12.5 28.9 17.5 28.9 20 20 C 22.5 11.1 27.5 11.1 30 20 C 32.5 28.9 37.5 28.9 40 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  transform: isPlaying ? "scaleY(1)" : "scaleY(0.1)",
                  transformBox: "view-box",
                  transformOrigin: "20px 20px",
                  transition: "transform 0.3s ease"
                }}
              />
            </svg>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle day / night theme"
            className="relative h-[36px] w-[36px] overflow-hidden rounded-full border border-white/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.10)] transition-transform hover:scale-[1.08] active:scale-[0.94]"
            style={{ background: isNight ? "#111c36" : "#fff" }}
          >
            {/* Sun Icon */}
            <svg
              viewBox="0 0 24 24"
              className="absolute left-1/2 top-1/2 h-[22px] w-[22px] text-[#f5a623] transition-transform duration-500"
              style={{
                transform: isNight ? "translate(-50%, -220%)" : "translate(-50%, -50%)",
                transitionTimingFunction: "cubic-bezier(0.34,1.4,0.5,1)"
              }}
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <g fill="currentColor">
                <circle cx="12" cy="3.6" r="1.15" />
                <circle cx="12" cy="20.4" r="1.15" />
                <circle cx="3.6" cy="12" r="1.15" />
                <circle cx="20.4" cy="12" r="1.15" />
                <circle cx="6.1" cy="6.1" r="1.15" />
                <circle cx="17.9" cy="6.1" r="1.15" />
                <circle cx="6.1" cy="17.9" r="1.15" />
                <circle cx="17.9" cy="17.9" r="1.15" />
              </g>
            </svg>
            {/* Moon Icon */}
            <svg
              viewBox="0 0 24 24"
              className="absolute left-1/2 top-1/2 h-5 w-5 text-[#f2ead6] transition-transform duration-500"
              style={{
                transform: isNight ? "translate(-50%, -50%)" : "translate(-50%, 150%)",
                transitionTimingFunction: "cubic-bezier(0.34,1.4,0.5,1)"
              }}
            >
              <path d="M20 14.2A8 8 0 1 1 10.3 4.2a6.4 6.4 0 0 0 9.7 10z" fill="currentColor" />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-menu-toggle"
            aria-label="Open navigation menu"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 8h14M5 16h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DIALOG */}
      {isMobileMenuOpen && (
        <dialog id="mobile-navigation" className="mobile-menu open" open>
          <div className="mobile-menu-header">
            <span id="mobile-menu-title">EXPLORE PORTFOLIO</span>
            <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu">×</button>
          </div>
          <nav aria-label="Mobile navigation">
            <a href="#work" onClick={() => setIsMobileMenuOpen(false)}>
              <span><small>01</small>Selected Work</span><span aria-hidden="true">↗</span>
            </a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
              <span><small>02</small>About me</span><span aria-hidden="true">↗</span>
            </a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>
              <span><small>03</small>Skills & Stack</span><span aria-hidden="true">↗</span>
            </a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <span><small>04</small>Let’s talk</span><span aria-hidden="true">↗</span>
            </a>
          </nav>
          <div className="mobile-menu-footer">
            <span><i></i> Available for work</span>
            <span>{profile.location || "TANGERANG, ID"}</span>
          </div>
        </dialog>
      )}

      {/* HERO SECTION - Natural Single Page Flow, Perfectly Spaced */}
      <section
        className="hero relative min-h-screen overflow-hidden flex flex-col justify-between"
        style={{
          background: "radial-gradient(ellipse 1000px 1340px at 68.65% 23.5%, var(--hero-from) 0%, var(--hero-to) 100%)"
        }}
      >
        {/* Background Sky WebGL Clouds & Gradient */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="relative h-full min-h-80 w-full overflow-hidden">
            {/* VOLUMETRIC CLOUDS SHADER */}
            <CloudShader isNight={isNight} speed={1.0} count={6} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#031835]/10 to-[#031835]/30 pointer-events-none" />
        </div>

        {/* Hero Stars & Meteor & Noise */}
        <div className="hero-stars pointer-events-none" aria-hidden="true" />
        <div className="hero-meteor pointer-events-none" aria-hidden="true" style={{ "--m-top": "18%", "--m-angle": "14deg", "--m-len": "200px", "--m-travel": "1600px" }} />
        <div
          className="hero-noise pointer-events-none absolute inset-0"
          style={{ backgroundImage: "url('/assets/imgNoiseTexture.webp')", backgroundSize: "512px 512px", opacity: 0.1 }}
          aria-hidden="true"
        />

        {/* Hero Content Elements */}
        <div id="hero-content" className="relative z-10 w-full pt-28 pb-12 px-6 sm:px-12 flex flex-col justify-between min-h-screen">
          {/* Sun Illustration */}
          <img
            alt=""
            aria-hidden="true"
            className="sun-group pointer-events-none absolute z-[2] h-auto"
            style={{
              width: "var(--sun-w)",
              top: "calc(var(--sun-w) * -0.256087)",
              right: "calc(var(--sun-w) * -0.171192)"
            }}
            src="/assets/sun.svg"
          />

          {/* Moon Illustration */}
          <div className="moon-group" aria-hidden="true">
            <span className="moon-glow" />
            <img alt="" className="moon-disc" src="/assets/moon.svg" />
          </div>

          <div className="hero-composition my-auto">
            {/* Hero Copy / Headings */}
            <div className="hero-copy">
              <p className="hero-eyebrow flex items-center justify-center gap-2 font-jetbrains-mono uppercase text-white tracking-wider text-xs mb-3">
                <img alt="" width="10.5" height="10.5" src="/assets/imgEllipse14.svg" />
                Hello, I’m {profile.name?.split(" ")[0] || "Arditya"}
              </p>

              <h1 className="hero-heading">
                <span className="sr-only">{profile.name}, {profile.title}</span>
                <span className="h-line multidisciplinary font-serif-display text-[var(--cream-text)]">
                  {"Developer who".split("").map((ch, i) => (
                    <span key={i} className={`h-letter ${ch === " " ? "h-space" : ""}`}>
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </span>
                <div className="hero-heading-second">
                  <span
                    id="scramble"
                    ref={scrambleRef}
                    aria-label="Builds, codes, ships, and solves"
                    className="h-line designer font-serif-display text-[var(--cream-text)]"
                  >
                    <span className="roll inline-grid" aria-hidden="true">
                      {rollWords.map((word, idx) => (
                        <span
                          key={word}
                          className="roll-word block font-serif-display leading-[1.2]"
                          style={{
                            gridArea: "1 / 1",
                            opacity: idx === 0 ? 1 : 0,
                            transform: idx === 0 ? "translateY(0)" : "translateY(100%)"
                          }}
                        >
                          {word.split("").map((ch, i) => (
                            <span key={i} className="h-letter">
                              {ch}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>
                  </span>
                </div>
              </h1>
            </div>

            {/* Hero Radio / Cassette Player Scene - Separated Below the text */}
            <div className="hero-radio-scene">
              <div className="recorder-wrap">
                <div className="recorder relative flex items-start gap-[22px] rounded-full border border-[#c9c9c9] bg-[#dfdcd5] p-4 shadow-[0_11px_9.6px_0_rgba(0,0,0,0.25)] after:pointer-events-none after:absolute after:-inset-px after:rounded-[inherit] after:shadow-[inset_0_5px_7.3px_2px_#f5f1ee,inset_-2px_-10px_2.3px_0_#b8b7b2] after:content-['']">
                  {/* Left Disk */}
                  <div className="recorder-disk relative h-[89px] w-[89px] flex-shrink-0 overflow-hidden rounded-full border-[3px] border-[#373535] shadow-[0_0_0_2px_#62615e]">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 180deg, rgb(18,18,18) 0%, rgb(39,39,39) 10%, rgb(80,80,80) 13%, rgb(100,100,100) 14%, rgb(38,38,38) 31%, rgb(18,18,18) 40%, rgb(100,100,100) 66%, rgb(18,18,18) 100%)",
                        animation: isPlaying ? "spin 3s linear infinite" : "none"
                      }}
                    />
                    <img alt="" className="absolute inset-0 rounded-full object-cover mix-blend-color-dodge opacity-20" src="/assets/imgDisk.webp" />
                    <img alt="" width="32" height="32" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/assets/imgEllipse13.svg" />
                    <img alt="" width="18" height="18" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/assets/imgEllipse12.svg" />
                    <img alt="" width="6" height="6" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/assets/imgEllipse11.svg" />
                  </div>

                  {/* Player Center Control */}
                  <div className="recorder-center flex w-[171.42px] flex-col items-center self-stretch">
                    <p className="mb-1 w-full font-jetbrains-mono text-[11px] tracking-[-0.12px] text-[#070707]">
                      Sekian, Terima Kasih
                      <span className="recorder-artist font-sans text-[9px] opacity-70 block">Lealona & The Jeblogs</span>
                    </p>

                    {/* Progress Slider */}
                    <div
                      ref={sliderRef}
                      onClick={handleSliderClick}
                      id="play-slider"
                      className="relative h-[23.45px] w-full touch-none cursor-pointer"
                    >
                      <div className="absolute inset-x-0 top-[5.58px] h-[12.29px] overflow-hidden rounded-full bg-[#686360] shadow-[0_3px_1px_0_#ededed]">
                        <div
                          className="absolute left-0 top-[0.46px] h-[11.83px] bg-[var(--gold)] transition-[width] duration-[120ms] ease-linear"
                          style={{ width: `${audioProgressPct}%` }}
                        />
                      </div>
                      <div
                        className="absolute top-0 flex items-center justify-center rounded-full border border-[#e4e5e5] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)] transition-[left] duration-[120ms] ease-linear"
                        style={{
                          left: `calc(${audioProgressPct}% - 11px)`,
                          width: "23.45px",
                          height: "23.45px",
                          background: "radial-gradient(circle at 50% 50%, #f6f4f5 0%, #caccc9 100%)"
                        }}
                      >
                        <span className="h-[7.32px] w-[7.32px] rounded-full shadow-[0_1px_1.9px_0_rgba(0,0,0,0.51)] bg-white" />
                      </div>
                    </div>

                    {/* Time display */}
                    <div className="flex w-full justify-between font-jetbrains-mono text-[10px] tracking-[-0.1px] text-[#070707]">
                      <span>{formatTime(currentTime)}</span>
                      <span>{duration ? formatTime(duration) : "—:—"}</span>
                    </div>

                    {/* Play Button */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      className="relative mt-1 h-[41.32px] w-[41.32px] rounded-full transition-transform duration-[180ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-[0.92]"
                    >
                      <img alt="" className="absolute inset-0" src="/assets/imgPlayCircle.svg" />
                      <img alt="" width="35" height="35" className="absolute inset-[8.33%] w-[83.34%] h-[83.34%]" src="/assets/imgGroup.svg" />
                    </button>
                  </div>

                  {/* Right Disk */}
                  <div className="recorder-disk relative h-[89px] w-[89px] flex-shrink-0 overflow-hidden rounded-full border-[3px] border-[#373535] shadow-[0_0_0_2px_#62615e]">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 180deg, rgb(18,18,18) 0%, rgb(39,39,39) 10%, rgb(80,80,80) 13%, rgb(100,100,100) 14%, rgb(38,38,38) 31%, rgb(18,18,18) 40%, rgb(100,100,100) 66%, rgb(18,18,18) 100%)",
                        animation: isPlaying ? "spin 3s linear infinite" : "none"
                      }}
                    />
                    <img alt="" className="absolute inset-0 rounded-full object-cover mix-blend-color-dodge opacity-20" src="/assets/imgDisk.webp" />
                    <img alt="" width="32" height="32" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/assets/imgEllipse13.svg" />
                    <img alt="" width="18" height="18" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/assets/imgEllipse12.svg" />
                    <img alt="" width="6" height="6" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/assets/imgEllipse11.svg" />
                  </div>
                </div>
              </div>
              <p className="hero-radio-note text-xs opacity-75 mt-3">A little music, while you explore.</p>
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div className="hero-bottom pt-8">
            <span className="hero-vertical font-jetbrains-mono text-xs opacity-80">CODE / SYSTEM / ARCHITECTURE</span>
            <a href="#work" className="font-jetbrains-mono text-xs opacity-90 hover:opacity-100 flex items-center gap-1">
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION - Solid Background, STRAIGHT CARDS (NO ROTATE / TILT) */}
      <section id="work" className="selected-work relative z-10 bg-[#fff9f1] dark:bg-[#111c36] text-[#17201c] dark:text-[#fff9f1] pt-20 pb-24" aria-labelledby="work-title">
        <div className="work-inner max-w-7xl mx-auto px-6 sm:px-12">
          <div className="work-kicker">
            <span><i></i> A FEW THINGS I’VE BEEN BUILDING</span>
            <span>01 / SELECTED WORK</span>
          </div>

          <header className="work-heading my-8">
            <h2 id="work-title" className="font-serif-display text-4xl sm:text-6xl text-[var(--work-ink)] leading-tight">
              Crafted with code.<br />
              <span className="italic">Built for impact.</span>
            </h2>
            <div className="mt-4">
              <p className="text-base opacity-80 max-w-xl font-sans">
                Dari arsitektur AI Multi-Agent hingga sistem kasir hybrid POS dan platform booking berstandar produksi.
              </p>
              <span className="work-note font-jetbrains-mono text-xs opacity-60 block mt-2">FEATURED PROJECTS · PRODUCTION CASE STUDIES</span>
            </div>
          </header>

          {/* STRAIGHT WORK GRID - Flat upright mockups, no rotation */}
          <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {featuredProjects.map((project, idx) => (
              <article
                key={project.id}
                className={idx === 0 ? "work-featured col-span-1 md:col-span-2" : "col-span-1"}
                style={{ opacity: 1, transform: "none" }}
              >
                <div className="w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className={`project-preview ${project.themeColor} text-left w-full block p-6 cursor-pointer hover:opacity-95 transition-opacity`}
                      aria-label={`Explore ${project.title} project`}
                    >
                      <div className="project-preview-top flex justify-between items-center mb-6">
                        <span className="font-jetbrains-mono text-xs font-semibold">{project.number} / {project.title.toUpperCase()}</span>
                        <span className="project-preview-badge px-3 py-1 rounded-full text-xs font-mono font-medium">{project.badge}</span>
                      </div>

                      {/* Straight Card Mockup - Flat & Aligned */}
                      {project.id === "velora-studio" && (
                        <div className="forma-window rounded-xl overflow-hidden shadow-xl border border-black/5 bg-white text-black" aria-hidden="true" style={{ transform: "none", position: "relative", top: 0, left: 0, width: "100%" }}>
                          <aside className="forma-sidebar hidden sm:block p-4 border-r border-gray-100 bg-gray-50/70">
                            <b className="mock-brand block text-lg font-bold mb-4 font-sans">v<span className="text-purple-600">elora</span></b>
                            <span className="mock-nav active block text-xs py-1.5 px-2 rounded bg-purple-100 font-semibold text-purple-900 font-sans">◈ Bookings</span>
                            <span className="mock-nav block text-xs py-1.5 px-2 text-gray-600 font-sans">▦ Sessions</span>
                            <span className="mock-nav block text-xs py-1.5 px-2 text-gray-600 font-sans">◷ Schedule</span>
                            <span className="mock-nav block text-xs py-1.5 px-2 text-gray-600 font-sans">✧ QR Tickets</span>
                            <div className="mock-avatar mt-6 text-xs text-gray-500 font-mono">VS Studio Space</div>
                          </aside>
                          <div className="forma-main p-6 flex-1 bg-white">
                            <div className="mock-topline flex justify-between text-xs text-gray-400 font-mono mb-3">
                              <span>Dashboard / Real-Time Bookings</span>
                              <span>Midtrans Gateway · Online</span>
                            </div>
                            <div className="mock-welcome mb-6">
                              <div>
                                <small className="text-[10px] font-mono uppercase tracking-wider text-purple-600">SELF PHOTO STUDIO & CLASS</small>
                                <h3 className="text-xl font-bold text-gray-900 font-serif-display">Velora Studio <span>✳</span></h3>
                                <p className="text-xs text-gray-500 font-sans">Sistem reservasi real-time anti double-booking.</p>
                              </div>
                            </div>
                            <div className="mock-stats grid grid-cols-3 gap-3 mb-6">
                              <div className="p-3 bg-purple-50/60 rounded-lg">
                                <small className="text-[10px] text-gray-500 block font-mono">Today Sessions</small>
                                <b className="text-lg font-bold text-gray-900 font-mono">18</b>
                                <span className="text-[10px] text-purple-600 block font-mono">Slots reserved ↗</span>
                              </div>
                              <div className="p-3 bg-green-50/60 rounded-lg">
                                <small className="text-[10px] text-gray-500 block font-mono">Payment Rate</small>
                                <b className="text-lg font-bold text-gray-900 font-mono">100%</b>
                                <span className="text-[10px] text-green-600 block font-mono">Midtrans Instant ✧</span>
                              </div>
                              <div className="p-3 bg-blue-50/60 rounded-lg">
                                <small className="text-[10px] text-gray-500 block font-mono">QR Verified</small>
                                <b className="text-lg font-bold text-gray-900 font-mono">96%</b>
                                <span className="text-[10px] text-blue-600 block font-mono">Check-in scanner</span>
                              </div>
                            </div>
                            <div className="mock-project-heading text-xs font-semibold text-gray-700 mb-2 font-mono">Core Tech Modules</div>
                            <div className="mock-boards space-y-2">
                              <div className="p-2.5 bg-gray-50 rounded flex items-center justify-between text-xs">
                                <div>
                                  <b className="text-gray-900 font-sans">Prisma ORM & PostgreSQL</b>
                                  <small className="text-gray-500 block font-sans">Concurrency Lock</small>
                                </div>
                                <span className="text-xs font-mono font-semibold text-purple-600">95%</span>
                              </div>
                              <div className="p-2.5 bg-gray-50 rounded flex items-center justify-between text-xs">
                                <div>
                                  <b className="text-gray-900 font-sans">Midtrans Payment Engine</b>
                                  <small className="text-gray-500 block font-sans">QRIS & VA Automated</small>
                                </div>
                                <span className="text-xs font-mono font-semibold text-purple-600">90%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === "asdoku" && (
                        <div className="rounded-xl overflow-hidden shadow-lg p-6 bg-amber-50/40 text-black border border-amber-200/50" aria-hidden="true">
                          <span className="font-serif-display text-xl block mb-4 text-amber-950 italic">
                            multi-agent ai, academic precision.
                          </span>
                          <div className="bg-white rounded-xl p-5 shadow border border-amber-100">
                            <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-2">
                              <span>INDOBERT ENGINE</span>
                              <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 font-bold">98.6% Confidence</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 font-serif-display">Docx Academic Formatter</h3>
                            <p className="text-xs text-gray-600 mb-4 font-sans">Otomasi margin, penomoran heading bab & sitasi APA sesuai pedoman kampus.</p>
                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 font-mono">
                              <span>Multi-Agent Coordinator Active</span> <span>→</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === "velora-pos" && (
                        <div className="rounded-xl overflow-hidden shadow-lg p-6 bg-slate-900 text-white border border-slate-800" aria-hidden="true">
                          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-4">
                            <b>◉ VELORA POS</b>
                            <span>Capacitor Hybrid Mobile</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="p-3 bg-slate-800/80 rounded-lg">
                              <small className="text-[10px] text-slate-400 block font-mono">Daily Orders</small>
                              <b className="text-xl font-bold text-white font-mono">142</b>
                              <span className="text-[10px] text-blue-400 block font-mono">↗ Active tickets</span>
                            </div>
                            <div className="p-3 bg-slate-800/80 rounded-lg">
                              <small className="text-[10px] text-slate-400 block font-mono">Stock Accuracy</small>
                              <b className="text-xl font-bold text-white font-mono">99.8%</b>
                              <span className="text-[10px] text-green-400 block font-mono">↗ Real-time sync</span>
                            </div>
                          </div>
                          <div className="p-3 bg-slate-800/50 rounded-lg text-xs font-mono text-slate-300">
                            <span>Transaction Velocity: Peak 24 orders/hr</span>
                          </div>
                        </div>
                      )}

                      <span className="project-open text-xs font-mono mt-4 block text-right opacity-80" aria-hidden="true">Explore details ↗</span>
                    </button>
                  </div>
                </div>

                <div className="project-caption mt-4">
                  <div>
                    <span className="project-category font-mono text-xs opacity-60 block uppercase">{project.category}</span>
                    <h3 className="text-2xl font-bold font-serif-display mt-1">
                      <button type="button" onClick={() => setActiveModalProject(project)} className="hover:underline font-serif-display">
                        {project.title} <span className="text-lg">↗</span>
                      </button>
                    </h3>
                    <p className="text-sm opacity-80 mt-1 font-sans">{project.tagline}</p>
                  </div>
                  <span className="project-role font-mono text-xs opacity-75 block mt-2">{project.roleBadge}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="work-end mt-16 text-center">
            <span className="text-sm opacity-70 block mb-2 font-jetbrains-mono">Engineering impactful software, one system at a time.</span>
            <a href="#work" className="font-jetbrains-mono text-xs underline opacity-80 hover:opacity-100">Back to top of work ↑</a>
          </div>
        </div>

        {/* PROJECT DETAILS MODAL DIALOG */}
        {activeModalProject && (
          <dialog className="project-dialog" open aria-labelledby="project-dialog-title">
            <div className="dialog-content">
              <button
                className="dialog-close"
                type="button"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close project details"
              >
                ×
              </button>

              <span className="project-category font-mono text-xs uppercase opacity-75">{activeModalProject.category}</span>
              <h2 id="project-dialog-title" className="font-serif-display text-3xl font-bold my-2">{activeModalProject.title}</h2>
              <p className="dialog-summary text-sm opacity-85 mb-4 font-sans">{activeModalProject.summary}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 my-4">
                {activeModalProject.demoUrl && (
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform font-sans"
                  >
                    Visit Live Demo ↗
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/30 text-white font-medium text-sm hover:border-white transition-colors font-sans"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>

              <h3 className="font-serif-display text-lg font-semibold mt-4 mb-1">The Challenge & Vision</h3>
              <p className="text-sm opacity-80 font-sans">{activeModalProject.ideaText}</p>

              <h3 className="font-serif-display text-lg font-semibold mt-4 mb-1">Technical Approach</h3>
              <p className="text-sm opacity-80 font-sans">{activeModalProject.approachText}</p>

              <h3 className="font-serif-display text-lg font-semibold mt-4 mb-1">Key Architecture & Deliverables</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm opacity-85 my-2 font-sans">
                {activeModalProject.points?.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>

              <div className="dialog-role mt-6 pt-4 border-t border-white/10">
                <span className="font-mono text-xs opacity-60">ROLE & STACK</span>
                <p className="font-semibold text-sm mt-1 font-sans">{activeModalProject.roleText}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeModalProject.techStack?.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded text-xs bg-white/10 text-white font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </dialog>
        )}
      </section>

      {/* ABOUT SECTION - Solid Background, Smooth Page Flow */}
      <section id="about" className="about-section relative z-10 bg-[#fff9f1] dark:bg-[#111c36] text-[#17201c] dark:text-[#fff9f1] py-20 border-t border-black/5 dark:border-white/5" aria-labelledby="about-title">
        <div className="about-inner max-w-7xl mx-auto px-6 sm:px-12">
          <div className="about-kicker">
            <span><i></i> THE PERSON BEHIND THE TERMINAL</span>
            <span>02 / A LITTLE ABOUT ME</span>
          </div>

          <div className="about-story mt-8">
            {/* Polaroid Photo Card */}
            <div className="about-photo-scene" style={{ opacity: 1, transform: "none" }}>
              <span className="about-doodle" aria-hidden="true">✳</span>
              <figure className="about-polaroid">
                <span className="polaroid-tape" aria-hidden="true" />
                <div className="polaroid-image relative overflow-hidden">
                  <img
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    src="/assets/photo.png"
                  />
                </div>
                <figcaption className="font-serif-display">Hi, I’m {profile.name?.split(" ")[0] || "Arditya"} <span aria-hidden="true">☺</span></figcaption>
              </figure>
              <span className="about-photo-note font-mono text-xs">a face behind the code <span aria-hidden="true">↗</span></span>
              <span className="about-location font-mono text-xs"><i></i> {profile.location || "TANGERANG, BANTEN"}</span>
            </div>

            {/* Bio Copy */}
            <div className="about-copy" style={{ opacity: 1, transform: "none" }}>
              <p className="about-intro font-jetbrains-mono text-sm opacity-70">Engineer. Builder. Always curious.</p>
              <h2 id="about-title" className="font-serif-display text-4xl sm:text-5xl mt-2 mb-4 leading-tight">
                Curious mind.<br />
                <span className="italic">Passionate builder.</span>
              </h2>
              <p className="about-lead text-base font-medium opacity-90 leading-relaxed mb-4 font-sans">
                Mahasiswa Teknik Informatika Universitas Esa Unggul (IPK 3.84) dengan spesialisasi full-stack development dan IT project management.
              </p>
              <p className="about-body text-sm opacity-80 leading-relaxed font-sans">
                Saya menyukai proses menerjemahkan ide kompleks menjadi arsitektur sistem yang scalable, handal, dan berorientasi pengguna. 
                Berpengalaman membangun aplikasi skala produksi, mengintegrasikan sistem Multi-Agent AI & IndoBERT, serta mengelola alur pengembangan dari konsep hingga deployment.
              </p>
              <div className="about-margin-note font-mono text-xs opacity-75 mt-6">
                <span aria-hidden="true">↳</span> Precision in code, purpose in design.
              </div>
            </div>
          </div>

          {/* Strengths Heading */}
          <div className="about-strengths-heading mt-16">
            <span className="font-mono text-xs uppercase opacity-60">WHAT I BRING TO THE TABLE</span>
            <span className="font-serif-display text-lg">A mix of logic, craft, and leadership.</span>
          </div>

          {/* Strengths Cards */}
          <div className="about-strengths grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <article className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5" style={{ opacity: 1, transform: "none" }}>
              <div className="strength-top flex justify-between items-center mb-4">
                <span className="strength-icon text-lg text-[var(--gold)]" aria-hidden="true">◈</span>
                <span className="font-mono text-xs opacity-50">01</span>
              </div>
              <h3 className="font-serif-display text-xl font-bold mb-2">Full-Stack Craft</h3>
              <p className="text-sm opacity-80 font-sans">Membangun sistem web & mobile end-to-end dengan performa tinggi, proteksi transaksi real-time, dan clean architecture.</p>
            </article>

            <article className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5" style={{ opacity: 1, transform: "none" }}>
              <div className="strength-top flex justify-between items-center mb-4">
                <span className="strength-icon text-lg text-[var(--gold)]" aria-hidden="true">✳</span>
                <span className="font-mono text-xs opacity-50">02</span>
              </div>
              <h3 className="font-serif-display text-xl font-bold mb-2">AI & Systems Engineering</h3>
              <p className="text-sm opacity-80 font-sans">Merancang arsitektur Multi-Agent System (MAS), integrasi NLP IndoBERT, dan otomatisasi alur kerja cerdas untuk kebutuhan nyata.</p>
            </article>

            <article className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5" style={{ opacity: 1, transform: "none" }}>
              <div className="strength-top flex justify-between items-center mb-4">
                <span className="strength-icon text-lg text-[var(--gold)]" aria-hidden="true">⌘</span>
                <span className="font-mono text-xs opacity-50">03</span>
              </div>
              <h3 className="font-serif-display text-xl font-bold mb-2">IT Project Management</h3>
              <p className="text-sm opacity-80 font-sans">Memimpin tim engineering, merencanakan roadmap produk, serta memastikan timeline dan deliverable tercapai dengan standar tinggi.</p>
            </article>
          </div>

          <div className="about-footnote mt-12 text-center">
            <span className="font-mono text-xs opacity-60 block mb-1">Still curious. Still making. Always learning.</span>
            <a href="#work" className="font-mono text-xs underline opacity-80 hover:opacity-100">Explore my work ↗</a>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - Solid Background, Clean Contrast */}
      <section id="skills" className="relative z-10 bg-[#f8f5ee] dark:bg-[#0c162c] text-[#17201c] dark:text-[#fff9f1] py-20 px-6 sm:px-12 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="font-jetbrains-mono text-xs tracking-wider uppercase opacity-60 mb-2">03 / TECH ARSENAL</p>
            <h2 className="text-4xl sm:text-5xl font-serif-display text-[var(--work-ink)] font-normal">
              Technologies & Tools
            </h2>
            <p className="opacity-75 max-w-2xl mt-2 text-sm sm:text-base font-sans">
              Perangkat dan ekosistem yang saya gunakan untuk mengeksekusi arsitektur web modern, AI, dan aplikasi produksi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 font-sans">
                <span className="text-[var(--gold)]">✦</span> Web & Full-Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js 16/14", "React 19", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "PHP / Laravel 11", "HTML5 & CSS3"].map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 font-sans">
                <span className="text-[var(--gold)]">✦</span> AI, Backend & Database
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "FastAPI", "IndoBERT", "Multi-Agent System", "Prisma ORM", "PostgreSQL", "MySQL", "AWS S3", "Streamlit"].map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 font-sans">
                <span className="text-[var(--gold)]">✦</span> Mobile, Tools & Management
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Capacitor", "Android / iOS", "Git & GitHub", "Midtrans Payment", "Resend API", "Agile / Scrum", "Jira / Trello", "System Design"].map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <div className="contact-surround relative z-10">
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-sky" aria-hidden="true">
            <div className="h-full w-full" style={{ background: "linear-gradient(#436f95, #88b2ce)" }} />
            <div className="contact-sky-shade" />
          </div>

          <div className="contact-inner">
            <div className="contact-kicker">
              <span><i></i> GOOD THINGS START WITH A HELLO</span>
              <span>04 / LET’S CONNECT</span>
            </div>

            <div className="contact-main" style={{ opacity: 1, transform: "none" }}>
              <span className="contact-star" aria-hidden="true">✳</span>
              <p className="contact-eyebrow font-jetbrains-mono">A NEW PROJECT. AN OPPORTUNITY. A SIMPLE HELLO.</p>
              <h2 id="contact-title" className="font-serif-display">
                Have something<br />
                <em>in mind?</em>
              </h2>
              <p className="contact-description font-sans">
                Mari diskusikan ide Anda dan wujudkan ke dalam solusi digital yang tangguh.<br />
                Terbuka untuk peluang magang, freelance, kolaborasi proyek, atau diskusi teknologi.
              </p>

              <a className="contact-cta font-sans" href={`mailto:${profile.email}`}>
                Let’s talk <span aria-hidden="true">↗</span>
              </a>

              <div className="contact-links font-sans">
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                )}
                {profile.phone && (
                  <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp ↗
                  </a>
                )}
                <a href="#work">Explore my work again ↗</a>
              </div>

              <span className="contact-handwritten font-sans">
                curiosity and discipline build great things <span aria-hidden="true">↗</span>
              </span>
            </div>

            <footer className="contact-footer">
              <a href="#" className="contact-signature font-serif-display" aria-label="Back to top">
                {profile.name}
                <span className="font-mono text-xs">FULL-STACK DEVELOPER & IT PROJECT MANAGER · {profile.location || "TANGERANG, ID"}</span>
              </a>
              <span className="contact-made font-sans text-xs">
                Made with passion by Arditya <i aria-hidden="true">♡</i>
              </span>
              <a className="contact-top font-mono text-xs" href="#">
                Back to the clouds <span aria-hidden="true">↑</span>
              </a>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
