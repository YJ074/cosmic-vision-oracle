
import fs from 'fs';
import path from 'path';

// Types for India location data
export interface IndiaLocationData {
  name: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  pinCode?: string;
}

// Interface for search parameters
export interface LocationSearchParams {
  name?: string;
  state?: string;
  district?: string;
  pinCode?: string;
}

// Sample data for key cities (small subset for immediate use)
// In a production app, this would be loaded from a complete dataset file
const SAMPLE_INDIA_LOCATIONS: IndiaLocationData[] = [
  {
    name: "New Delhi",
    state: "Delhi",
    district: "New Delhi",
    lat: 28.6139,
    lng: 77.2090,
    pinCode: "110001"
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    district: "Mumbai",
    lat: 19.0760,
    lng: 72.8777,
    pinCode: "400001"
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    district: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    pinCode: "700001"
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    district: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    pinCode: "600001"
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    district: "Bengaluru Urban",
    lat: 12.9716,
    lng: 77.5946,
    pinCode: "560001"
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    district: "Hyderabad",
    lat: 17.3850,
    lng: 78.4867,
    pinCode: "500001"
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    district: "Ahmedabad",
    lat: 23.0225,
    lng: 72.5714,
    pinCode: "380001"
  },
  {
    name: "Pune",
    state: "Maharashtra",
    district: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    pinCode: "411001"
  },
  {
    name: "Surat",
    state: "Gujarat",
    district: "Surat",
    lat: 21.1702,
    lng: 72.8311,
    pinCode: "395001"
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    lat: 26.9124,
    lng: 75.7873,
    pinCode: "302001"
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    lat: 26.8467,
    lng: 80.9462,
    pinCode: "226001"
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    lat: 25.3176,
    lng: 82.9739,
    pinCode: "221001"
  }
];

// In-memory cache of loaded locations
let locationsCache: IndiaLocationData[] | null = null;

/**
 * Get coordinates for an Indian location by name
 * First tries exact match, then partial match
 */
export function getIndiaLocationCoordinates(
  query: string
): { lat: number; lng: number } | null {
  if (!query) return null;
  
  // Initialize with sample data if no data is loaded yet
  if (!locationsCache) {
    locationsCache = SAMPLE_INDIA_LOCATIONS;
    // In a complete implementation, we would load the full dataset
    // from a JSON or CSV file here
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Try exact match first
  const exactMatch = locationsCache.find(
    loc => loc.name.toLowerCase() === normalizedQuery ||
           `${loc.name.toLowerCase()}, ${loc.state.toLowerCase()}` === normalizedQuery
  );
  
  if (exactMatch) {
    return { lat: exactMatch.lat, lng: exactMatch.lng };
  }
  
  // Try partial match if no exact match
  const partialMatch = locationsCache.find(
    loc => loc.name.toLowerCase().includes(normalizedQuery) ||
           loc.district.toLowerCase().includes(normalizedQuery) ||
           loc.state.toLowerCase().includes(normalizedQuery)
  );
  
  if (partialMatch) {
    return { lat: partialMatch.lat, lng: partialMatch.lng };
  }
  
  return null;
}

/**
 * Search India locations with multiple filters
 */
export function searchIndiaLocations(
  params: LocationSearchParams
): IndiaLocationData[] {
  if (!locationsCache) {
    locationsCache = SAMPLE_INDIA_LOCATIONS;
    // In a complete implementation, we would load the full dataset here
  }
  
  return locationsCache.filter(loc => {
    // Match all provided filters
    if (params.name && !loc.name.toLowerCase().includes(params.name.toLowerCase())) {
      return false;
    }
    
    if (params.state && !loc.state.toLowerCase().includes(params.state.toLowerCase())) {
      return false;
    }
    
    if (params.district && !loc.district.toLowerCase().includes(params.district.toLowerCase())) {
      return false;
    }
    
    if (params.pinCode && loc.pinCode !== params.pinCode) {
      return false;
    }
    
    return true;
  });
}

/**
 * Get a list of all states in the dataset
 */
export function getAllStates(): string[] {
  if (!locationsCache) {
    locationsCache = SAMPLE_INDIA_LOCATIONS;
  }
  
  const states = new Set<string>();
  locationsCache.forEach(loc => states.add(loc.state));
  return Array.from(states).sort();
}

/**
 * Get all districts in a specific state
 */
export function getDistrictsInState(state: string): string[] {
  if (!locationsCache) {
    locationsCache = SAMPLE_INDIA_LOCATIONS;
  }
  
  const districts = new Set<string>();
  locationsCache
    .filter(loc => loc.state.toLowerCase() === state.toLowerCase())
    .forEach(loc => districts.add(loc.district));
  
  return Array.from(districts).sort();
}

// Utility function to load the full dataset
// This would be called when the app initializes in a complete implementation
export async function loadFullDataset(): Promise<void> {
  try {
    // In a real implementation, this would load data from a file or API
    // For now, we'll use our sample data
    locationsCache = SAMPLE_INDIA_LOCATIONS;
    console.log('India geo data loaded successfully');
  } catch (error) {
    console.error('Failed to load India geo data:', error);
    // Fallback to sample data
    locationsCache = SAMPLE_INDIA_LOCATIONS;
  }
}

// Export the sample data for development purposes
export const getSampleIndiaLocations = () => SAMPLE_INDIA_LOCATIONS;
