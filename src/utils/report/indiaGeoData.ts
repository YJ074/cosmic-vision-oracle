
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
  },
  // Additional cities from North India
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    district: "Shimla",
    lat: 31.1048,
    lng: 77.1734,
    pinCode: "171001"
  },
  {
    name: "Chandigarh",
    state: "Chandigarh",
    district: "Chandigarh",
    lat: 30.7333,
    lng: 76.7794,
    pinCode: "160001"
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    district: "Dehradun",
    lat: 30.3165,
    lng: 78.0322,
    pinCode: "248001"
  },
  {
    name: "Srinagar",
    state: "Jammu and Kashmir",
    district: "Srinagar",
    lat: 34.0837,
    lng: 74.7973,
    pinCode: "190001"
  },
  {
    name: "Amritsar",
    state: "Punjab",
    district: "Amritsar",
    lat: 31.6340,
    lng: 74.8723,
    pinCode: "143001"
  },
  // Additional cities from East India
  {
    name: "Guwahati",
    state: "Assam",
    district: "Kamrup Metropolitan",
    lat: 26.1445,
    lng: 91.7362,
    pinCode: "781001"
  },
  {
    name: "Patna",
    state: "Bihar",
    district: "Patna",
    lat: 25.5941,
    lng: 85.1376,
    pinCode: "800001"
  },
  {
    name: "Bhubaneswar",
    state: "Odisha",
    district: "Khordha",
    lat: 20.2961,
    lng: 85.8245,
    pinCode: "751001"
  },
  {
    name: "Ranchi",
    state: "Jharkhand",
    district: "Ranchi",
    lat: 23.3441,
    lng: 85.3096,
    pinCode: "834001"
  },
  {
    name: "Gangtok",
    state: "Sikkim",
    district: "East Sikkim",
    lat: 27.3389,
    lng: 88.6065,
    pinCode: "737101"
  },
  // Additional cities from South India
  {
    name: "Kochi",
    state: "Kerala",
    district: "Ernakulam",
    lat: 9.9312,
    lng: 76.2673,
    pinCode: "682001"
  },
  {
    name: "Thiruvananthapuram",
    state: "Kerala",
    district: "Thiruvananthapuram",
    lat: 8.5241,
    lng: 76.9366,
    pinCode: "695001"
  },
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    lat: 11.0168,
    lng: 76.9558,
    pinCode: "641001"
  },
  {
    name: "Mysore",
    state: "Karnataka",
    district: "Mysore",
    lat: 12.2958,
    lng: 76.6394,
    pinCode: "570001"
  },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    lat: 17.6868,
    lng: 83.2185,
    pinCode: "530001"
  },
  // Additional cities from West India
  {
    name: "Panaji",
    state: "Goa",
    district: "North Goa",
    lat: 15.4909,
    lng: 73.8278,
    pinCode: "403001"
  },
  {
    name: "Indore",
    state: "Madhya Pradesh",
    district: "Indore",
    lat: 22.7196,
    lng: 75.8577,
    pinCode: "452001"
  },
  {
    name: "Bhopal",
    state: "Madhya Pradesh",
    district: "Bhopal",
    lat: 23.2599,
    lng: 77.4126,
    pinCode: "462001"
  },
  {
    name: "Vadodara",
    state: "Gujarat",
    district: "Vadodara",
    lat: 22.3072,
    lng: 73.1812,
    pinCode: "390001"
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    district: "Udaipur",
    lat: 24.5854,
    lng: 73.7125,
    pinCode: "313001"
  },
  // Additional cities from Central India
  {
    name: "Nagpur",
    state: "Maharashtra",
    district: "Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    pinCode: "440001"
  },
  {
    name: "Raipur",
    state: "Chhattisgarh",
    district: "Raipur",
    lat: 21.2514,
    lng: 81.6296,
    pinCode: "492001"
  },
  // Additional cities from Northeast India
  {
    name: "Shillong",
    state: "Meghalaya",
    district: "East Khasi Hills",
    lat: 25.5788,
    lng: 91.8933,
    pinCode: "793001"
  },
  {
    name: "Aizawl",
    state: "Mizoram",
    district: "Aizawl",
    lat: 23.7307,
    lng: 92.7173,
    pinCode: "796001"
  },
  {
    name: "Imphal",
    state: "Manipur",
    district: "Imphal West",
    lat: 24.8170,
    lng: 93.9368,
    pinCode: "795001"
  },
  {
    name: "Agartala",
    state: "Tripura",
    district: "West Tripura",
    lat: 23.8315,
    lng: 91.2868,
    pinCode: "799001"
  },
  {
    name: "Itanagar",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    lat: 27.0844,
    lng: 93.6053,
    pinCode: "791111"
  },
  {
    name: "Kohima",
    state: "Nagaland",
    district: "Kohima",
    lat: 25.6746,
    lng: 94.1100,
    pinCode: "797001"
  },
  // Popular tourist destinations
  {
    name: "Darjeeling",
    state: "West Bengal",
    district: "Darjeeling",
    lat: 27.0410,
    lng: 88.2663,
    pinCode: "734101"
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    district: "Kullu",
    lat: 32.2396,
    lng: 77.1887,
    pinCode: "175131"
  },
  {
    name: "Leh",
    state: "Ladakh",
    district: "Leh",
    lat: 34.1526,
    lng: 77.5771,
    pinCode: "194101"
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    district: "Dehradun",
    lat: 30.0869,
    lng: 78.2676,
    pinCode: "249201"
  },
  {
    name: "Jaisalmer",
    state: "Rajasthan",
    district: "Jaisalmer",
    lat: 26.9157,
    lng: 70.9083,
    pinCode: "345001"
  },
  {
    name: "Goa Velha",
    state: "Goa",
    district: "North Goa",
    lat: 15.4419,
    lng: 73.8708,
    pinCode: "403108"
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
