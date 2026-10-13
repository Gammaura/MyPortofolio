"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CloudShader from "./CloudShader";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function GammauraPortfolio({ data }) {
  const profile = data?.profile || {
    name: "Arditya Adjie Rosandi",
    title: "Full-Stack Developer & IT Project Manager",
    location: "TANGERANG, ID",
    about: "Full-Stack Developer & IT Project Manager dengan spesialisasi dalam rekayasa backend performa tinggi, arsitektur Multi-Agent AI, dan aplikasi skala produksi modern.",
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

  // Audio ref
  const audioRef = useRef(null);
  const sliderRef = useRef(null);
  const scrambleRef = useRef(null);

  const rollWords = ["Builds", "Codes", "Ships", "Solves"];

  // Theme Sync effect with live MutationObserver on document.body
  useEffect(() => {
    const checkTheme = () => {
      const isNightMode = document.body.classList.contains("night") || localStorage.getItem("theme") === "night";
      setIsNight(isNightMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    const handleThemeChange = (e) => {
      if (e?.detail?.isNight !== undefined) {
        setIsNight(e.detail.isNight);
      } else {
        checkTheme();
      }
    };
    window.addEventListener("themechange", handleThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("themechange", handleThemeChange);
    };
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

  // Word Roll effect with Web Animations API
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
            { transform: "translateY(100%)", opacity: 0 }
          ],
          config
        ),
        words[nextIdx].animate(
          [
            { transform: "translateY(-100%)", opacity: 0 },
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
            timer = setTimeout(rollNext, 1700);
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



  return (
    <div className="relative min-h-screen bg-[var(--work-bg)] text-[var(--work-ink)] overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

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
          {!isNight && (
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
          )}

          <div className="hero-composition my-auto">
            {/* Hero Copy / Headings */}
            <div className="hero-copy">
              <p
                className="hero-eyebrow flex items-center justify-center gap-2 font-jetbrains-mono uppercase text-white tracking-wider text-xs mb-3"
                data-i18n="heroKicker"
              >
                HELLO, I’M {profile.name ? profile.name.toUpperCase() : "ARDITYA ADJIE ROSANDI"}
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
                <div className="hero-heading-second pointer-events-none select-none">
                  <span
                    id="scramble"
                    ref={scrambleRef}
                    aria-label="Builds, codes, ships, and solves"
                    className="h-line designer font-serif-display text-[var(--cream-text)] pointer-events-none select-none"
                  >
                    <span className="roll inline-grid pointer-events-none select-none" aria-hidden="true">
                      {rollWords.map((word, idx) => (
                        <span
                          key={word}
                          className="roll-word block font-serif-display leading-[1.2] pointer-events-none select-none"
                          style={{
                            gridArea: "1 / 1",
                            opacity: idx === 0 ? 1 : 0,
                            transform: idx === 0 ? "translateY(0)" : "translateY(100%)"
                          }}
                        >
                          {word.split("").map((ch, i) => (
                            <span key={i} className="h-letter pointer-events-none select-none">
                              {ch}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>
                  </span>
                </div>
              </h1>

              {/* Quick Social Logos (Clickable icons without text labels - Official Brand Icons) */}
              <div className="hero-social-row relative z-50 pointer-events-auto flex items-center justify-center gap-3.5 mt-5">
                {/* GitHub (Official) */}
                <a
                  href={profile.github || "https://github.com/Gammaura"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 hover:shadow-[0_12px_24px_rgba(24,23,23,0.35)] hover:ring-2 hover:ring-black/20 active:scale-90 active:translate-y-0.5 border border-white cursor-pointer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#181717] transition-transform duration-300 group-hover:scale-110">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>

                {/* LinkedIn (Official) */}
                <a
                  href={profile.linkedin || "https://www.linkedin.com/in/ardityaadjierosandi"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 hover:shadow-[0_12px_24px_rgba(10,102,194,0.35)] hover:ring-2 hover:ring-[#0A66C2]/25 active:scale-90 active:translate-y-0.5 border border-white cursor-pointer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                    <path fill="#0A66C2" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                {/* Gmail (Official Google Workspace) */}
                <a
                  href={`mailto:${profile.email || "ardityaa.id@gmail.com"}`}
                  className="group w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_12px_24px_rgba(234,67,53,0.35)] hover:ring-2 hover:ring-[#EA4335]/25 active:scale-90 active:translate-y-0.5 border border-white cursor-pointer"
                  aria-label="Email (Gmail)"
                  title="Gmail"
                >
                  <svg viewBox="0 0 512 512" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                    <path d="M34.9 448h81.5V250.2L0 163v250.2C0 432.5 15.7 448 34.9 448" fill="#4285F4"/>
                    <path d="M395.6 448h81.5c19.3 0 34.9-15.7 34.9-34.9V163l-116.4 87.3" fill="#34A853"/>
                    <path d="M395.6 99v151.3L512 163v-46.5c0-43.2-49.3-67.8-83.8-41.9" fill="#FBBC04"/>
                    <path d="M116.4 250.2V99L256 203.7 395.6 99v151.3L256 355" fill="#EA4335"/>
                    <path d="M0 116.4V163l116.4 87.3V99L83.8 74.5C49.2 48.6 0 73.2 0 116.4" fill="#C5221F"/>
                  </svg>
                </a>

                {/* WhatsApp (Official) */}
                <a
                  href="https://wa.me/6287717956553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_12px_24px_rgba(37,211,102,0.35)] hover:ring-2 hover:ring-[#25D366]/25 active:scale-90 active:translate-y-0.5 border border-white cursor-pointer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] transition-transform duration-300 group-hover:scale-110">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
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
          <div className="hero-bottom pt-8 flex items-center justify-between">
            <span className="hero-vertical font-jetbrains-mono text-xs opacity-80">CODE / SYSTEM / ARCHITECTURE</span>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Placed directly below Hero section) */}
      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-inner">
          <div className="about-kicker">
            <span><i></i> THE PERSON BEHIND THE TERMINAL</span>
            <span>01 / A LITTLE ABOUT ME</span>
          </div>

          <div className="about-story mt-8">
            {/* Polaroid Photo Card (Straight & upright alignment) */}
            <div className="about-photo-scene" style={{ opacity: 1, transform: "none" }}>
              <span className="about-doodle" aria-hidden="true" style={{ transform: "none" }}>✳</span>
              <figure className="about-polaroid" style={{ transform: "none", rotate: "0deg" }}>
                <span className="polaroid-tape" aria-hidden="true" style={{ transform: "none", rotate: "0deg" }} />
                <div className="polaroid-image relative overflow-hidden">
                  <img
                    alt={profile.name || "Adjie"}
                    className="w-full h-full object-cover"
                    src={profile.avatar || "/assets/photo.png"}
                  />
                </div>
                <figcaption className="font-serif-display flex items-center justify-center gap-2 text-center w-full">Hi, I’m {profile.nickname || "Adjie"} <span aria-hidden="true">☺</span></figcaption>
              </figure>
              <span className="about-photo-note font-mono text-xs" style={{ transform: "none", rotate: "0deg", marginLeft: 0 }}>a face behind the code</span>
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
                Full-Stack Developer & IT Project Manager dengan spesialisasi dalam rekayasa backend performa tinggi, arsitektur Multi-Agent AI, dan aplikasi skala produksi modern.
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
          <div className="about-strengths-heading">
            <span>WHAT I BRING TO THE TABLE</span>
            <span>A mix of logic, craft, and leadership.</span>
          </div>

          {/* Strengths Cards - Authentic Editorial Grid */}
          <div className="about-strengths">
            <article style={{ opacity: 1, transform: "none" }}>
              <div className="strength-top">
                <span className="strength-icon" aria-hidden="true">◈</span>
                <span>01</span>
              </div>
              <h3>Full-Stack Craft</h3>
              <p>Membangun sistem web &amp; mobile end-to-end dengan performa tinggi, proteksi transaksi real-time, dan clean architecture.</p>
            </article>

            <article style={{ opacity: 1, transform: "none" }}>
              <div className="strength-top">
                <span className="strength-icon" aria-hidden="true">✳</span>
                <span>02</span>
              </div>
              <h3>AI &amp; Systems Engineering</h3>
              <p>Merancang arsitektur Multi-Agent System (MAS), integrasi NLP IndoBERT, dan otomatisasi alur kerja cerdas untuk kebutuhan nyata.</p>
            </article>

            <article style={{ opacity: 1, transform: "none" }}>
              <div className="strength-top">
                <span className="strength-icon" aria-hidden="true">⌘</span>
                <span>03</span>
              </div>
              <h3>IT Project Management</h3>
              <p>Memimpin tim engineering, merencanakan roadmap produk, serta memastikan timeline dan deliverable tercapai dengan standar tinggi.</p>
            </article>
          </div>

          <div className="about-footnote">
            <span>Still curious. Still making. Always learning.</span>
          </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION */}
      <section id="work" className="selected-work" aria-labelledby="work-title">
        <div className="work-inner">
          <div className="work-kicker">
            <span><i></i> A FEW THINGS I’VE BEEN BUILDING</span>
            <span>02 / SELECTED WORK</span>
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

          {/* WORK GRID - 6 cards matching clean archive card design */}
          <div className="archive-grid" style={{ marginTop: "32px", marginBottom: "36px" }}>
            {((data?.projects && data.projects.length > 0) ? data.projects : []).slice(0, 6).map((p) => (
              <div className="archive-card" key={p.title}>
                {p.image && (
                  <div className="archive-card-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                )}
                <div className="archive-card-content">
                  <h3>{p.title}</h3>
                  <p>{p.shortDescription}</p>
                  <div className="archive-card-more">
                    <Link href="/projects" className="archive-more-link">
                      <span>Lihat selengkapnya</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button: Lihat Semua Proyek (Centered Pill) */}
          <div className="work-all-cta flex items-center justify-center my-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-white text-slate-900 border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer font-sans"
            >
              <span className="text-sm font-bold tracking-tight">Lihat Semua Proyek</span>
              <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#181717] group-hover:text-white flex items-center justify-center text-slate-700 transition-all duration-300 group-hover:translate-x-1 text-xs font-bold">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <div className="contact-surround relative z-10">
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-sky" aria-hidden="true">
            <CloudShader isNight={isNight} speed={0.8} count={5} />
            <div className="contact-sky-shade" />
          </div>

          <div className="contact-inner">
            <div className="contact-kicker">
              <span><i></i> GOOD THINGS START WITH A HELLO</span>
              <span>03 / LET’S CONNECT</span>
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

              <a className="contact-cta font-sans" href={`mailto:${profile.email || "ardityaa.id@gmail.com"}`}>
                Let’s connect
              </a>

              <span className="contact-handwritten font-sans mt-8">
                curiosity and discipline build great things
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* SITE FOOTER */}
      <Footer name={profile.name} />
    </div>
  );
}
