
import { BirthData } from "@/components/BirthDataForm";
import { ReportContent } from "@/components/AstrologyReport";
import { generateReport } from "./reportGenerator";
import { loadFullDataset } from "./indiaGeoData";

// Initialize location data when the module is first loaded
loadFullDataset().catch(err => {
  console.error("Failed to load location dataset:", err);
});

// Re-export the main function
export { generateReport };

// Re-export India geo data functions
export * from "./indiaGeoData";

