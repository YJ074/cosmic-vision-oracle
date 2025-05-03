
import { BirthData } from "@/components/BirthDataForm";
import { LocationCoordinates } from "./types";

// Public Mapbox API key for demo purposes. For production, set your own!
const DEMO_MAPBOX_KEY = "pk.eyJ1IjoibG92YWJsZWlsbCIsImEiOiJjanZwdmI1d20wNGZhM3pubnBrZ2drM2xlIn0.ClfC0cuGZ4SKyA9T6ZlPeA";

// Get coordinates from place name using Mapbox geocoding API
export async function getCoordinates(place: string): Promise<LocationCoordinates> {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${DEMO_MAPBOX_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features[0]) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
  // Default coordinates if geocoding fails (0°N 0°E - null island)
  return { lat: 0, lng: 0 };
}
