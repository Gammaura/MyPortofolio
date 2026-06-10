import React from "react";
import { getCVData } from "./actions";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Code, Briefcase, Calendar, Mail, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getCVData();

  const quickLinks = [
    { href: "/skills", label: "Keahlian & Tech Stack", desc: "Lihat teknologi yang saya kuasai", icon: Code },
    { href: "/projects", label: "Koleksi Project", desc: "Jelajahi karya dan aplikasi yang telah dibuat", icon: Briefcase },
    { href: "/organizations", label: "Pengalaman Organisasi", desc: "Aktivitas kepemimpinan dan kolaborasi", icon: Calendar },
    { href: "/contact", label: "Hubungi Saya", desc: "Diskusi project, magang, atau kolaborasi", icon: Mail },
  ];

  return (
    <div className="min-h-screen grid-bg relative flex flex-col selection:bg-primary/30 selection:text-blue-200">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-primary/5 via-transparent to-transparent pointer-events-none z-0" />
      
      <Navbar />
      <HeroSection profile={data.profile} allData={data} />

      {/* About Section */}
      <AboutSection />

      {/* Quick Navigation Cards */}
      <section className="relative z-10 -mt-20 pb-20 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group glass-panel rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform">
                <link.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm text-[var(--section-title)] group-hover:text-primary transition-colors">
                    {link.label}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-[var(--muted-text)] mt-1">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer name={data.profile.name} />
    </div>
  );
}