import React from "react";
import { getCVData } from "../actions";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getCVData();
  return {
    title: `Project - ${data.profile.name}`,
    description: `Koleksi project dan karya buatan ${data.profile.name}.`,
  };
}

export default async function ProjectsPage() {
  const data = await getCVData();

  return <ProjectsClient projects={data.projects} profile={data.profile} />;
}
