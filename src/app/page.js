import React from "react";
import { getCVData } from "./actions";
import XavieraPortfolio from "@/components/XavieraPortfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getCVData();

  return (
    <main className="min-h-screen">
      <XavieraPortfolio data={data} />
    </main>
  );
}
