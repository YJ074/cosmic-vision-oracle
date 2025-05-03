
// Gemstone recommendations based on birth chart
export function getRecommendedGemstones(birthChart: Record<string, string>): string {
  const gemstoneMap: Record<string, string[]> = {
    "Sun": ["Ruby", "Red Garnet"],
    "Moon": ["Pearl", "Moonstone"],
    "Mercury": ["Emerald", "Jade"],
    "Venus": ["Diamond", "Clear Quartz"],
    "Mars": ["Red Coral", "Carnelian"],
    "Jupiter": ["Yellow Sapphire", "Citrine"],
    "Saturn": ["Blue Sapphire", "Amethyst"],
    "Uranus": ["Aquamarine", "Turquoise"],
    "Neptune": ["Amethyst", "Labradorite"],
    "Pluto": ["Obsidian", "Black Tourmaline"]
  };
  
  // Select gemstones based on strongest planetary influences
  const significantPlanets = Object.keys(birthChart).slice(0, 3);
  const recommendedGemstones = significantPlanets.flatMap(planet => 
    gemstoneMap[planet] ? [gemstoneMap[planet][0]] : []
  );
  
  return recommendedGemstones.join(", ");
}

// Color recommendations based on birth chart
export function getRecommendedColors(birthChart: Record<string, string>): string {
  const colorMap: Record<string, string[]> = {
    "Sun": ["Gold", "Orange", "Yellow"],
    "Moon": ["White", "Silver", "Pale Blue"],
    "Mercury": ["Green", "Light Blue"],
    "Venus": ["Pink", "Pastel Colors"],
    "Mars": ["Red", "Crimson"],
    "Jupiter": ["Royal Blue", "Purple"],
    "Saturn": ["Dark Blue", "Black"],
    "Uranus": ["Electric Blue", "Metallic Colors"],
    "Neptune": ["Sea Green", "Lavender"],
    "Pluto": ["Deep Red", "Black"]
  };
  
  // Select colors based on significant planets
  const significantPlanets = Object.keys(birthChart).slice(0, 3);
  const recommendedColors = significantPlanets.map(planet => 
    colorMap[planet] ? colorMap[planet][Math.floor(Math.random() * colorMap[planet].length)] : ""
  ).filter(color => color);
  
  return recommendedColors.join(", ");
}

// Direction recommendations based on birth chart
export function getAuspiciousDirections(birthChart: Record<string, string>): string {
  const directionMap: Record<string, string> = {
    "Aries": "East",
    "Taurus": "South-East",
    "Gemini": "South",
    "Cancer": "South-West",
    "Leo": "West",
    "Virgo": "North-West",
    "Libra": "North",
    "Scorpio": "North-East",
    "Sagittarius": "East",
    "Capricorn": "South-East",
    "Aquarius": "South",
    "Pisces": "South-West"
  };
  
  // Get directions based on Sun and Moon signs
  const sunSign = birthChart["Sun"];
  const moonSign = birthChart["Moon"];
  
  const directions = [];
  if (sunSign && directionMap[sunSign]) directions.push(directionMap[sunSign]);
  if (moonSign && directionMap[moonSign] && !directions.includes(directionMap[moonSign])) 
    directions.push(directionMap[moonSign]);
  
  return directions.join(" and ");
}
