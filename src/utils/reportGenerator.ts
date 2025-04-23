
import { BirthData } from "@/components/BirthDataForm";
import { ReportContent } from "@/components/AstrologyReport";

// Helper function to get current season based on month
function getCurrentSeason(month: number): string {
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  if (month >= 9 && month <= 11) return "Autumn";
  return "Winter";
}

// Define planets and their astrological meanings
const planets = [
  {
    name: "Sun",
    qualities: ["identity", "ego", "vitality"],
    influence: "core personality and life purpose"
  },
  {
    name: "Moon",
    qualities: ["emotions", "instincts", "subconscious"],
    influence: "emotional needs and reactions"
  },
  {
    name: "Mercury",
    qualities: ["communication", "intellect", "perception"],
    influence: "thinking style and information processing"
  },
  {
    name: "Venus",
    qualities: ["love", "beauty", "values"],
    influence: "approach to relationships and aesthetics"
  },
  {
    name: "Mars",
    qualities: ["energy", "action", "desire"],
    influence: "drive, ambition, and how you assert yourself"
  },
  {
    name: "Jupiter",
    qualities: ["growth", "expansion", "wisdom"],
    influence: "opportunities for growth and abundance"
  },
  {
    name: "Saturn",
    qualities: ["structure", "discipline", "responsibility"],
    influence: "life lessons and areas requiring maturity"
  },
  {
    name: "Uranus",
    qualities: ["innovation", "rebellion", "awakening"],
    influence: "where you seek freedom and originality"
  },
  {
    name: "Neptune",
    qualities: ["spirituality", "dreams", "illusion"],
    influence: "spiritual aspirations and ideals"
  },
  {
    name: "Pluto",
    qualities: ["transformation", "power", "rebirth"],
    influence: "profound transformation and regeneration"
  }
];

// Helper function to calculate planetary positions based on birth data
// This is a simplified simulation - real astrology would require more complex calculations
function calculatePlanetaryPositions(birthData: BirthData): Record<string, string> {
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
  planets.forEach((planet, index) => {
    // Generate a deterministic but seemingly random zodiac position based on birth data
    const position = (seed + index * 1000) % 12;
    positions[planet.name] = zodiacSigns[position];
  });
  
  return positions;
}

// Calculate astrological houses based on birth time
function calculateHouses(birthData: BirthData): Record<string, string> {
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
    const housePosition = (birthHour + i) % 12;
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

// Generate quarterly predictions with specific themes and planetary influences
function generateQuarterlyPredictions(userData: BirthData, yearOffset: number): string[] {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentSeason = getCurrentSeason(currentMonth);
  
  // Calculate planetary positions based on birth data
  const planetaryPositions = calculatePlanetaryPositions(userData);
  
  // Calculate astrological houses
  const houses = calculateHouses(userData);
  
  const quarters = [
    {
      title: "Q1: Initiation & New Beginnings",
      themes: ["personal growth", "spiritual awakening", "fresh opportunities"],
      planets: ["Sun", "Mars", "Jupiter"]
    },
    {
      title: "Q2: Development & Integration",
      themes: ["relationship dynamics", "skill mastery", "emotional balance"],
      planets: ["Venus", "Moon", "Mercury"]
    },
    {
      title: "Q3: Manifestation & Achievement",
      themes: ["career progress", "material gains", "social connections"],
      planets: ["Saturn", "Jupiter", "Venus"]
    },
    {
      title: "Q4: Reflection & Transformation",
      themes: ["spiritual deepening", "inner wisdom", "future planning"],
      planets: ["Pluto", "Neptune", "Uranus"]
    }
  ];

  return quarters.map((quarter, index) => {
    // Get relevant planetary influences for this quarter
    const relevantPlanets = quarter.planets.map(planetName => {
      const planet = planets.find(p => p.name === planetName);
      const sign = planetaryPositions[planetName];
      return {
        name: planetName,
        sign: sign,
        qualities: planet?.qualities || [],
        influence: planet?.influence || ""
      };
    });
    
    return `§${quarter.title}§\n\n${generateQuarterContent(userData, quarter.themes, relevantPlanets, yearOffset, houses)}`;
  });
}

function getPlanetaryInfluence(quarterIndex: number): string {
  const influences = [
    "Jupiter and Mars align favorably",
    "Venus and Mercury create harmonious aspects",
    "Saturn forms significant transitions",
    "The Moon and Sun bring illuminating phases"
  ];
  return influences[quarterIndex];
}

function generateQuarterContent(
  userData: BirthData,
  themes: string[],
  relevantPlanets: {name: string; sign: string; qualities: string[]; influence: string}[],
  yearOffset: number,
  houses: Record<string, string>
): string {
  // Generate detailed planetary aspect descriptions
  const planetaryDescriptions = relevantPlanets.map(planet => 
    `Your ${planet.name} in ${planet.sign} influences your ${planet.influence}, bringing focus to ${getRandomElement(planet.qualities)}. `
  ).join("");
  
  // Select relevant houses for this quarter
  const houseKeys = Object.keys(houses);
  const relevantHouseKeys = [
    houseKeys[yearOffset % 4], 
    houseKeys[(yearOffset + 3) % 12], 
    houseKeys[(yearOffset + 6) % 12]
  ];
  const houseInfluences = relevantHouseKeys.map(key => `${key} - ${houses[key]}`).join("\n");
  
  const predictions = [
    planetaryDescriptions,
    `This quarter brings opportunities for growth through ${getRandomElement(supportiveActivities)}. `,
    `You will experience significant developments in ${themes.join(" and ")}. `,
    `Focus on ${getRandomElement(spiritualPractices)} to enhance your journey. `,
    generateTypeSpecificContent(userData.reportType),
    `\n\nKey Astrological Houses Activated This Quarter:\n${houseInfluences}\n\n`,
    `Guidance: ${generateGuidanceBasedOnPlanets(relevantPlanets)}`
  ].join("");

  return predictions;
}

function generateGuidanceBasedOnPlanets(planets: {name: string; sign: string; qualities: string[]; influence: string}[]): string {
  const guidanceMap: Record<string, string[]> = {
    "Sun": [
      "Express your authentic self without hesitation",
      "Focus on developing your unique talents and abilities",
      "Spend time in natural sunlight to recharge your vital energy"
    ],
    "Moon": [
      "Honor your emotional needs and cycles",
      "Create a nurturing home environment",
      "Connect with your intuition through dream journaling"
    ],
    "Mercury": [
      "Enhance communication skills through reading and writing",
      "Consider learning a new language or skill",
      "Practice mindful listening in conversations"
    ],
    "Venus": [
      "Cultivate beauty and harmony in your surroundings",
      "Invest in relationships that bring mutual joy",
      "Express yourself through art or creative pursuits"
    ],
    "Mars": [
      "Channel energy into physical exercise or competitions",
      "Take initiative in areas where you seek progress",
      "Practice healthy assertion of your needs and boundaries"
    ],
    "Jupiter": [
      "Expand your horizons through learning or travel",
      "Practice generosity and optimism",
      "Seek wisdom through philosophical or spiritual studies"
    ],
    "Saturn": [
      "Build disciplined routines for long-term success",
      "Take responsibility for your personal growth",
      "Honor commitments and develop patience"
    ],
    "Uranus": [
      "Embrace positive change and innovation",
      "Connect with groups that share your ideals",
      "Give yourself freedom to explore unconventional ideas"
    ],
    "Neptune": [
      "Develop your spiritual practice or meditation",
      "Express yourself through music, art, or poetry",
      "Be discerning about what influences you absorb"
    ],
    "Pluto": [
      "Release what no longer serves your highest good",
      "Explore shadow work for personal transformation",
      "Recognize and reclaim your personal power"
    ]
  };
  
  // Collect guidance for each relevant planet
  const guidance = planets.map(planet => {
    const options = guidanceMap[planet.name] || [];
    return options.length > 0 ? getRandomElement(options) : "";
  }).filter(g => g).join(". ");
  
  return guidance;
}

const supportiveActivities = [
  "meditation and self-reflection",
  "learning from spiritual texts",
  "connecting with like-minded individuals",
  "practicing mindfulness in daily activities",
  "engaging in creative expression",
  "physical movement aligned with cosmic rhythms",
  "energy healing practices",
  "rituals that honor natural cycles",
  "journal writing during significant moon phases",
  "studying ancient wisdom traditions"
];

const spiritualPractices = [
  "developing a regular spiritual practice",
  "maintaining emotional balance",
  "cultivating inner wisdom",
  "strengthening your connection to higher guidance",
  "practicing gratitude and compassion",
  "aligning with planetary energies through intention",
  "working with gemstones associated with your birth chart",
  "creating sacred space for contemplation",
  "dream interpretation and analysis",
  "breathwork techniques for spiritual awareness"
];

function generateTypeSpecificContent(reportType: string): string {
  const contentMap: { [key: string]: string[] } = {
    comprehensive: [
      "Your overall growth path shows promising developments across multiple dimensions.",
      "The planetary alignments suggest a period of holistic expansion in key life areas.",
      "Balance material and spiritual aspects for optimal progress during this cycle."
    ],
    career: [
      "Professional opportunities align with your natural talents as shown in your birth chart.",
      "Leadership qualities associated with your Sun position will be highlighted and recognized.",
      "Financial planning brings positive results, especially with Jupiter's influence."
    ],
    relationships: [
      "Venus in your chart indicates deeper connections develop through authentic communication.",
      "Family bonds strengthen through shared experiences aligned with your Moon placement.",
      "New meaningful relationships enter your life through unexpected synchronicities."
    ],
    health: [
      "Holistic wellness approaches resonating with your birth chart bring lasting benefits.",
      "Mental and physical balance improves significantly with proper planetary alignment.",
      "New healthy habits take root and flourish under supportive cosmic energies."
    ],
    spiritual: [
      "Spiritual insights lead to profound personal transformation, especially with Pluto's influence.",
      "Ancient wisdom provides guidance for modern challenges through your Neptune connection.",
      "Meditation practices aligned with your chart deepen your cosmic connection exponentially."
    ]
  };

  const options = contentMap[reportType] || contentMap.comprehensive;
  return getRandomElement(options);
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate a report based on the user's birth data
export function generateReport(userData: BirthData): ReportContent[] {
  const result: ReportContent[] = [];
  const currentYear = new Date().getFullYear();
  
  // Calculate planetary positions for the birth chart
  const birthChart = calculatePlanetaryPositions(userData);
  const houses = calculateHouses(userData);
  
  // Format birth chart into readable text
  const birthChartReadings = Object.entries(birthChart).map(([planet, sign]) => 
    `${planet} in ${sign}`
  );
  
  // Format houses into readable text
  const houseReadings = Object.entries(houses).slice(0, 4).map(([house, influence]) => 
    `${house} - ${influence}`
  );

  // Generate prediction for each year in the duration
  for (let i = 1; i <= userData.duration; i++) {
    const yearContent: ReportContent = {
      year: currentYear + i - 1,
      predictions: [
        "§Introduction§\n\n" +
        `Based on your Vedic birth chart analysis, this ${i === 1 ? "first" : "coming"} year holds significant potential for growth and transformation. The planetary configurations suggest a period of ${i % 2 === 0 ? "internal development" : "external manifestation"}.` +
        `\n\n§Your Birth Chart Highlights§\n\n` +
        `Key planetary positions at your time of birth:\n` +
        birthChartReadings.slice(0, 5).join("\n") +
        `\n\nPrimary House Influences:\n` +
        houseReadings.join("\n") +
        `\n\nThese cosmic positions form the foundation of your unique astrological blueprint and influence the predictions that follow.`,
        
        ...generateQuarterlyPredictions(userData, i),
        
        "§Spiritual Guidance & Remedies§\n\n" +
        `To harmonize with these cosmic energies:\n` +
        `• Incorporate ${getRandomElement(supportiveActivities)} into your routine\n` +
        `• Practice ${getRandomElement(spiritualPractices)} regularly\n` +
        `• Pay special attention to your spiritual growth during ${getRandomElement(["full moons", "new moons", "eclipses", "retrograde periods"])}\n` +
        `• Gemstones aligned with your birth chart: ${getRecommendedGemstones(birthChart)}\n` +
        `• Beneficial colors based on your planetary positions: ${getRecommendedColors(birthChart)}\n` +
        `• Auspicious directions for important activities: ${getAuspiciousDirections(birthChart)}\n\n` +
        `Remember, these celestial insights are guides for your journey. Your free will and conscious choices shape your path forward.`
      ]
    };
    result.push(yearContent);
  }

  return result;
}

function getRecommendedGemstones(birthChart: Record<string, string>): string {
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

function getRecommendedColors(birthChart: Record<string, string>): string {
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
    colorMap[planet] ? getRandomElement(colorMap[planet]) : ""
  ).filter(color => color);
  
  return recommendedColors.join(", ");
}

function getAuspiciousDirections(birthChart: Record<string, string>): string {
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
