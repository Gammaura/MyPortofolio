import React from "react";
import { getCVData } from "./actions";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getCVData();

  return (
    <div className="min-h-screen grid-bg relative flex flex-col selection:bg-primary/30 selection:text-blue-200">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-primary/5 via-transparent to-transparent pointer-events-none z-0" />
      
      <Navbar />
      <HeroSection profile={data.profile} allData={data} />

      {/* About Section */}
      <AboutSection />

      <Footer name={data.profile.name} />
    </div>
  );
}