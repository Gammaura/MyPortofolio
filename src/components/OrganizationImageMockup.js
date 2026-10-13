"use client";

import React from "react";
import Image from "next/image";
import { Users, Award, Terminal, Music, GraduationCap } from "lucide-react";

export default function OrganizationImageMockup({ role = "", organization = "", period = "", image = "" }) {
  const orgLower = organization.toLowerCase();
  const roleLower = role.toLowerCase();

  let theme = {
    gradient: "from-slate-950 via-slate-900 to-blue-950",
    icon: Users,
    accentColor: "text-blue-400",
  };

  if (orgLower.includes("codehub") || roleLower.includes("chairman")) {
    theme = {
      gradient: "from-slate-950 via-blue-950 to-indigo-950",
      icon: Terminal,
      accentColor: "text-blue-400",
    };
  } else if (orgLower.includes("bem") || roleLower.includes("branch head")) {
    theme = {
      gradient: "from-slate-950 via-sky-950 to-slate-900",
      icon: Award,
      accentColor: "text-sky-400",
    };
  } else if (orgLower.includes("band") || orgLower.includes("inaugurasi")) {
    theme = {
      gradient: "from-slate-950 via-purple-950 to-slate-900",
      icon: Music,
      accentColor: "text-purple-400",
    };
  } else if (orgLower.includes("pkkmb") || roleLower.includes("mentor")) {
    theme = {
      gradient: "from-slate-950 via-emerald-950 to-slate-900",
      icon: GraduationCap,
      accentColor: "text-emerald-400",
    };
  } else if (orgLower.includes("hmif")) {
    theme = {
      gradient: "from-slate-950 via-indigo-950 to-slate-900",
      icon: Terminal,
      accentColor: "text-indigo-400",
    };
  }

  const IconComp = theme.icon;

  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      {image ? (
        <Image
          src={image}
          alt={`${organization} - ${role}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} p-6 flex flex-col justify-center items-center text-center relative`}>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-sm mb-3">
            <IconComp className={`w-6 h-6 ${theme.accentColor}`} />
          </div>
          <h4 className="text-base font-extrabold text-white truncate max-w-[260px] tracking-tight">
            {organization}
          </h4>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {role}
          </p>
        </div>
      )}
    </div>
  );
}
