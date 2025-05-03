
import { BirthData } from "@/components/BirthDataForm";
import { LocationCoordinates } from "./types";

// Helper function to calculate planetary positions based on birth data
// This is a simplified simulation - real astrology would require more complex calculations
export function calculatePlanetaryPositions(birthData: BirthData): Record<string, string> {
  const birthDate = new Date(birthData.dateOfBirth);
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  
  // Use birth data components to create pseudo-deterministic planetary positions
  // This ensures consistent results for the same birth data
  const seed = (birthYear * 10000) + (birthMonth * 100) + birthDay;
  
  // Zodiac signs
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  // Calculate positions - simplified approach, not astronomically accurate
  const positions: Record<string, string> = {};
  const planetNames = [
    "Sun", "Moon", "Mercury", "Venus", "Mars",
    "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"
  ];
  
  planetNames.forEach((planet, index) => {
    // Generate a deterministic but seemingly random zodiac position based on birth data
    const position = (seed + index * 1000) % 12;
    positions[planet] = zodiacSigns[position];
  });
  
  return positions;
}

// Helper function to calculate astrological houses with location data
export function calculateHousesWithLocation(
  birthData: BirthData, 
  coordinates: LocationCoordinates
): Record<string, string> {
  const houses: Record<string, string> = {};
  const houseNames = [
    "Identity", "Values", "Communication", "Home & Family",
    "Creativity", "Service", "Relationships", "Transformation",
    "Exploration", "Career", "Community", "Spirituality"
  ];
  
  // Parse birth time and use coordinates for more accurate calculations
  const [birthHour, birthMinute] = birthData.timeOfBirth.split(':').map(Number);
  
  for (let i = 1; i <= 12; i++) {
    const houseInfluence = calculateHouseInfluenceWithLocation(
      birthHour, 
      birthMinute, 
      i, 
      coordinates.lat, 
      coordinates.lng
    );
    
    houses[`House ${i}: ${houseNames[i-1]}`] = 
      `Influence on your ${houseNames[i-1].toLowerCase()} derives from ${houseInfluence}`;
  }
  
  return houses;
}

function calculateHouseInfluenceWithLocation(
  hour: number, 
  minute: number, 
  house: number, 
  latitude: number, 
  longitude: number
): string {
  const influences = [
    "strong inner guidance and self-awareness",
    "balanced material and spiritual values",
    "eloquent expression and intellectual curiosity",
    "nurturing relationships and family bonds",
    "creative self-expression and joyful pursuits",
    "dedication to service and daily routines",
    "harmonious partnerships and cooperative endeavors",
    "profound transformation and regenerative power",
    "philosophical expansion and spiritual journeys",
    "disciplined ambition and structured achievements",
    "innovative social connections and humanitarian ideals",
    "deep spiritual connection and subconscious insights"
  ];
  
  // Use location data to adjust influence
  const latitudeInfluence = Math.abs(latitude) / 90; // Normalize to 0-1
  const longitudeInfluence = ((longitude + 180) % 360) / 360; // Normalize to 0-1
  
  // Calculate influence index using all parameters
  const influenceIndex = Math.floor(
    (hour + minute + house + (latitudeInfluence * 12) + (longitudeInfluence * 12)) % influences.length
  );
  
  const hemispherePrefix = latitude >= 0 ? "Northern" : "Southern";
  const regionSuffix = longitude >= 0 ? "Eastern" : "Western";
  
  return `${influences[influenceIndex]} (${hemispherePrefix}-${regionSuffix} influence)`;
}

// Calculate astrological houses based on birth time
export function calculateHouses(birthData: BirthData): Record<string, string> {
  const houses: Record<string, string> = {};
  const houseNames = [
    "Identity", "Values", "Communication", "Home & Family",
    "Creativity", "Service", "Relationships", "Transformation",
    "Exploration", "Career", "Community", "Spirituality"
  ];
  
  // Parse birth time
  const [birthHour, birthMinute] = birthData.timeOfBirth.split(':').map(Number);
  
  // Use birth time to determine house positions (simplified)
  for (let i = 1; i <= 12; i++) {
    // Calculate house influences - simplified approach
    houses[`House ${i}: ${houseNames[i-1]}`] = 
      `Influence on your ${houseNames[i-1].toLowerCase()} derives from ${
        calculateHouseInfluence(birthHour, birthMinute, i)
      }`;
  }
  
  return houses;
}

function calculateHouseInfluence(hour: number, minute: number, house: number): string {
  const influences = [
    "strong inner guidance and self-awareness",
    "balanced material and spiritual values",
    "eloquent expression and intellectual curiosity",
    "nurturing relationships with family and roots",
    "creative self-expression and joyful pursuits",
    "dedication to service and daily routines",
    "harmonious partnerships and cooperative endeavors",
    "profound transformation and regenerative power",
    "philosophical expansion and spiritual journeys",
    "disciplined ambition and structured achievements",
    "innovative social connections and humanitarian ideals",
    "deep spiritual connection and subconscious insights"
  ];
  
  // Determine influence based on birth time and house number
  const influenceIndex = (hour + minute + house) % influences.length;
  return influences[influenceIndex];
}
