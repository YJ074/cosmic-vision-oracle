
import { BirthData } from "@/components/BirthDataForm";
import { ReportContent } from "@/components/AstrologyReport";
import { 
  calculatePlanetaryPositions, 
  calculateHouses, 
  calculateHousesWithLocation 
} from "./astroCalculations";
import { 
  generatePredictions 
} from "./periodGenerators";
import {
  generateYearSummary,
  generateOverallForecast
} from "./yearSummary";
import {
  getRecommendedGemstones,
  getRecommendedColors,
  getAuspiciousDirections
} from "./recommendations";
import { getCoordinates } from "./geodata";
import { getRandomElement } from "./helpers";
import { supportiveActivities, spiritualPractices } from "./planetaryData";

// Update the main report generation function
export async function generateReport(userData: BirthData): Promise<ReportContent[]> {
  const result: ReportContent[] = [];
  const currentYear = new Date().getFullYear();
  
  // Calculate planetary positions for the birth chart
  const birthChart = calculatePlanetaryPositions(userData);
  
  // Format birth chart into readable text
  const birthChartReadings = Object.entries(birthChart).map(([planet, sign]) => 
    `${planet} in ${sign}`
  );
  
  // Update the predictions generation to include location data
  const coordinates = await getCoordinates(userData.placeOfBirth);
  const houses = calculateHousesWithLocation(userData, coordinates);

  // Format houses into readable text
  const houseReadings = Object.entries(houses).slice(0, 4).map(([house, influence]) => 
    `${house} - ${influence}`
  );

  // Add overall forecast for the entire duration
  const overallForecast = generateOverallForecast(userData, userData.duration);

  // Generate prediction for each year in the duration
  for (let i = 1; i <= userData.duration; i++) {
    const isYearlyReport = userData.duration === 1;
    const yearContent: ReportContent = {
      year: currentYear + i - 1,
      predictions: [
        i === 1 ? overallForecast : "",
        
        "§Introduction§\n\n" +
        `This ${getOrdinal(i)} year of your ${userData.duration}-year forecast holds significant potential for growth and transformation. The planetary configurations suggest a period of ${i % 2 === 0 ? "internal development" : "external manifestation"}.` +
        `\n\n§Your Birth Chart Highlights§\n\n` +
        `Key planetary positions at your time of birth:\n` +
        birthChartReadings.slice(0, 5).join("\n") +
        `\n\nPrimary House Influences:\n` +
        houseReadings.join("\n") +
        `\n\nThese cosmic positions form the foundation of your unique astrological blueprint and influence the predictions that follow.`,
        
        generateYearSummary(userData, i, birthChart),
        
        ...generatePredictions(userData, i, isYearlyReport, birthChart, houses),
        
        "§Spiritual Guidance & Remedies§\n\n" +
        `To harmonize with these cosmic energies:\n` +
        `• Incorporate ${getRandomElement(supportiveActivities)} into your routine\n` +
        `• Practice ${getRandomElement(spiritualPractices)} regularly\n` +
        `• Pay special attention to your spiritual growth during ${getRandomElement(["full moons", "new moons", "eclipses", "retrograde periods"])}\n` +
        `• Gemstones aligned with your birth chart: ${getRecommendedGemstones(birthChart)}\n` +
        `• Beneficial colors based on your planetary positions: ${getRecommendedColors(birthChart)}\n` +
        `• Auspicious directions for important activities: ${getAuspiciousDirections(birthChart)}\n\n` +
        `Remember, these celestial insights are guides for your journey. Your free will and conscious choices shape your path forward.`
      ].filter(Boolean) // Remove empty strings
    };
    result.push(yearContent);
  }

  return result;
}

// Helper function to get ordinal suffix
function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
