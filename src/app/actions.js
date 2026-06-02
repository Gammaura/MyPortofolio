"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const dataFilePath = path.join(process.cwd(), "src/data/cv-data.json");

export async function getCVData() {
  try {
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading CV data file:", error);
    // Return a fallback structure if file reading fails
    return {
      profile: { name: "", title: "", email: "", phone: "", location: "", about: "", linkedin: "", github: "" },
      skills: [],
      organizations: [],
      projects: []
    };
  }
}

export async function updateCVData(newData) {
  try {
    // Validate data structure basic requirements
    if (!newData.profile || !newData.skills || !newData.organizations || !newData.projects) {
      throw new Error("Invalid CV data structure");
    }
    
    const stringifiedData = JSON.stringify(newData, null, 2);
    await fs.writeFile(dataFilePath, stringifiedData, "utf8");
    
    // Revalidate the home page and other routes to update Cache
    revalidatePath("/");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating CV data file:", error);
    return { success: false, error: error.message };
  }
}
