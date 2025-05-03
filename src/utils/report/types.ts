
import { BirthData } from "@/components/BirthDataForm";

// Define interfaces for location coordinates
export interface LocationCoordinates {
  lat: number;
  lng: number;
}

// Planet types and data structure
export interface Planet {
  name: string;
  qualities: string[];
  influence: string;
}

// Quarter period structure for multi-year reports
export interface QuarterPeriod {
  title: string;
  period: string;
  theme: string;
  months: string[];
}

// Section content types for predictions
export type SectionType = 'career' | 'financial' | 'health' | 'personal' | 'remedies';
