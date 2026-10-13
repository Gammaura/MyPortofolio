import React from "react";
import { getCVData } from "./actions";
import GammauraPortfolio from "@/components/GammauraPortfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getCVData();

  return (
    <main className="min-h-screen">
      <GammauraPortfolio data={data} />
    </main>
  );
}
