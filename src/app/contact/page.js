import React from "react";
import { getCVData } from "../actions";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getCVData();
  return {
    title: `Kontak - ${data.profile.name}`,
    description: `Hubungi ${data.profile.name} untuk kerjasama project, magang, atau diskusi.`,
  };
}

export default async function ContactPage() {
  const data = await getCVData();

  return (
    <div className="min-h-screen grid-bg relative flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none z-0" />
      <Navbar />
      <main className="flex-grow relative z-10 pt-28">
        <ContactSection profile={data.profile} />
      </main>
      <Footer name={data.profile.name} />
    </div>
  );
}