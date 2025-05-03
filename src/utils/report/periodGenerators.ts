
import { BirthData } from "@/components/BirthDataForm";
import { QuarterPeriod, Planet } from "./types";
import { 
  getRelevantPlanetsForPeriod, 
  generateDetailedPredictionBlock 
} from "./contentGenerator";

// Generate monthly predictions with detailed sections
export function generateMonthlyPredictions(
  userData: BirthData, 
  yearOffset: number, 
  planetaryPositions: Record<string, string>, 
  houses: Record<string, string>
): string[] {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return months.map((month, index) => {
    // Get relevant planetary influences for this month
    const relevantPlanets = getRelevantPlanetsForPeriod(index) as Planet[];
    
    return `§${month}§\n\n${generateDetailedPredictionBlock(
      userData, 
      relevantPlanets, 
      yearOffset, 
      houses, 
      month, 
      index
    )}`;
  });
}

// Generate quarterly predictions with detailed sections
export function generateQuarterlyPredictions(
  userData: BirthData, 
  yearOffset: number,
  planetaryPositions: Record<string, string>,
  houses: Record<string, string>
): string[] {
  const quarters: QuarterPeriod[] = [
    {
      title: "Q1: January - March",
      period: "First Quarter",
      theme: "New Beginnings & Initiative",
      months: ["January", "February", "March"]
    },
    {
      title: "Q2: April - June",
      period: "Second Quarter",
      theme: "Growth & Development",
      months: ["April", "May", "June"]
    },
    {
      title: "Q3: July - September",
      period: "Third Quarter", 
      theme: "Harvest & Evaluation",
      months: ["July", "August", "September"]
    },
    {
      title: "Q4: October - December",
      period: "Fourth Quarter",
      theme: "Reflection & Planning",
      months: ["October", "November", "December"]
    }
  ];

  return quarters.map((quarter, index) => {
    // Get relevant planetary influences for this quarter
    const relevantPlanets = getRelevantPlanetsForPeriod(index) as Planet[];
    
    return `§${quarter.title}§\n\n${generateDetailedPredictionBlock(
      userData, 
      relevantPlanets, 
      yearOffset, 
      houses, 
      quarter.period, 
      index, 
      quarter.theme
    )}`;
  });
}

// Generate predictions based on duration - modified to support different timeframes
export function generatePredictions(
  userData: BirthData, 
  yearOffset: number, 
  isYearlyReport: boolean,
  planetaryPositions: Record<string, string>, 
  houses: Record<string, string>
): string[] {
  if (isYearlyReport) {
    // Generate monthly predictions for 1-year reports
    return generateMonthlyPredictions(userData, yearOffset, planetaryPositions, houses);
  } else {
    // Generate quarterly predictions for multi-year reports
    return generateQuarterlyPredictions(userData, yearOffset, planetaryPositions, houses);
  }
}
