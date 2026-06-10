import React from "react";
import { getCVData } from "../actions";
import Navbar from "@/components/Navbar";
import OrganizationsSection from "@/components/OrganizationsSection";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getCVData();
  return {
    title: `Organisasi - ${data.profile.name}`,
    description: `Riwayat organisasi dan kepengurusan ${data.profile.name}.`,
  };
}

export default async function OrganizationsPage() {
  const data = await getCVData();

  return (
    <div className="min-h-screen grid-bg relative flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none z-0" />
      <Navbar />
      <main className="flex-grow relative z-10 pt-28">
        <OrganizationsSection organizations={data.organizations} />
      </main>
      <Footer name={data.profile.name} />
    </div>
  );
}