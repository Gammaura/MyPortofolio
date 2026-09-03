"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";

export default function ProjectsClient({ projects, profile }) {
  return (
    <div className="min-h-screen relative flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <ProjectsSection projects={projects} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
