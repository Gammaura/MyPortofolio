import React from "react";
import { getCVData } from "./actions";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import OrganizationsSection from "@/components/OrganizationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Force Dynamic rendering to read the latest JSON file values on each request
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getCVData();

  return (
    <div className="min-h-screen grid-bg relative flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Floating Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection profile={data.profile} allData={data} />

      {/* Core sections */}
      <main className="flex-grow relative z-10 space-y-12">
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <OrganizationsSection organizations={data.organizations} />
        <ContactSection profile={data.profile} />
      </main>

      {/* Footer */}
      <Footer name={data.profile.name} />
    </div>
  );
}
