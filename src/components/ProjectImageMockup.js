"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Shield,
  Scissors,
  Camera,
  Trophy,
  Stethoscope,
  Lock,
  Image as ImageIcon,
  BookOpen,
  Layers,
  ShoppingBag,
  Cpu,
} from "lucide-react";

export default function ProjectImageMockup({
  title = "",
  role = "",
  techStack = [],
  image = "",
  images = [],
}) {
  // Normalize images array (support multiple images or fallback to single image)
  const allImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images.filter(Boolean);
    }
    if (image) {
      return [image];
    }
    return [];
  }, [images, image]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 3.5 seconds when there are multiple images
  useEffect(() => {
    if (allImages.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % allImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [allImages.length, isHovered]);

  const t = title.toLowerCase();

  let theme = {
    bg: "from-slate-950 via-slate-900 to-blue-950",
    icon: Terminal,
    accent: "text-blue-400",
  };

  if (t.includes("asdoku")) {
    theme = {
      bg: "from-slate-950 via-blue-950 to-indigo-950",
      icon: Cpu,
      accent: "text-blue-400",
    };
  } else if (t.includes("velora pos") || t.includes("pos-velora")) {
    theme = {
      bg: "from-slate-950 via-emerald-950 to-slate-900",
      icon: ShoppingBag,
      accent: "text-emerald-400",
    };
  } else if (t.includes("velora")) {
    theme = {
      bg: "from-slate-950 via-zinc-900 to-black",
      icon: Camera,
      accent: "text-amber-400",
    };
  } else if (t.includes("certify")) {
    theme = {
      bg: "from-slate-950 via-blue-950 to-indigo-950",
      icon: Shield,
      accent: "text-blue-400",
    };
  } else if (t.includes("solaria") || t.includes("pos")) {
    theme = {
      bg: "from-slate-950 via-emerald-950 to-slate-900",
      icon: ShoppingBag,
      accent: "text-emerald-400",
    };
  } else if (t.includes("framecut")) {
    theme = {
      bg: "from-slate-950 via-rose-950 to-slate-900",
      icon: Scissors,
      accent: "text-rose-400",
    };
  } else if (t.includes("fotosphere")) {
    theme = {
      bg: "from-slate-950 via-purple-950 to-slate-900",
      icon: Camera,
      accent: "text-purple-400",
    };
  } else if (t.includes("smashzone")) {
    theme = {
      bg: "from-slate-950 via-amber-950 to-slate-900",
      icon: Trophy,
      accent: "text-amber-400",
    };
  } else if (t.includes("healthcare") || t.includes("ai")) {
    theme = {
      bg: "from-slate-950 via-cyan-950 to-slate-900",
      icon: Stethoscope,
      accent: "text-cyan-400",
    };
  } else if (t.includes("lockme")) {
    theme = {
      bg: "from-slate-950 via-zinc-900 to-black",
      icon: Lock,
      accent: "text-zinc-400",
    };
  } else if (t.includes("nanopic")) {
    theme = {
      bg: "from-slate-950 via-fuchsia-950 to-slate-900",
      icon: ImageIcon,
      accent: "text-fuchsia-400",
    };
  } else if (t.includes("codehub")) {
    theme = {
      bg: "from-slate-950 via-sky-950 to-slate-900",
      icon: Layers,
      accent: "text-sky-400",
    };
  } else if (t.includes("edu") || t.includes("task") || t.includes("kiosk")) {
    theme = {
      bg: "from-slate-950 via-indigo-950 to-slate-900",
      icon: BookOpen,
      accent: "text-indigo-400",
    };
  }

  const IconComp = theme.icon;
  const currentImage = allImages[activeIdx] || allImages[0];

  return (
    <div
      className="w-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Showcase Canvas */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {currentImage ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={`${title} - Preview ${activeIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top"
                priority={activeIdx === 0}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Clean minimal graphic when no image is uploaded */
          <div className={`w-full h-full bg-gradient-to-br ${theme.bg} p-6 flex flex-col justify-center items-center text-center relative`}>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-sm mb-3">
              <IconComp className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <h4 className="text-base font-extrabold text-white truncate max-w-[260px] tracking-tight">
              {title}
            </h4>
            <p className="text-xs font-mono text-slate-400 mt-1">
              {role}
            </p>
          </div>
        )}
      </div>

      {/* 3 Interactive Thumbnail Boxes Below the Main Image */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-2 mt-2.5">
          {allImages.slice(0, 3).map((imgSrc, idx) => {
            const isActive = activeIdx === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                aria-label={`Lihat gambar ke-${idx + 1}`}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? "border-blue-600 dark:border-blue-400 ring-2 ring-blue-500/20 shadow-sm opacity-100 scale-[1.02]"
                    : "border-slate-200 dark:border-slate-800 opacity-50 hover:opacity-90 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
                {/* Active bottom indicator line */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
