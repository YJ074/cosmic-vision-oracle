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

// Add new interface for location coordinates
interface LocationCoordinates {
  lat: number;
  lng: number;
}

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

// Helper function to calculate astrological houses with location data
function calculateHousesWithLocation(birthData: BirthData, coordinates: LocationCoordinates): Record<string, string> {
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

// Generate predictions based on duration - modified to support different timeframes
function generatePredictions(userData: BirthData, yearOffset: number, isYearlyReport: boolean): string[] {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentSeason = getCurrentSeason(currentMonth);
  
  // Calculate planetary positions based on birth data
  const planetaryPositions = calculatePlanetaryPositions(userData);
  
  // Calculate astrological houses
  const houses = calculateHouses(userData);

  if (isYearlyReport) {
    // Generate monthly predictions for 1-year reports
    return generateMonthlyPredictions(userData, yearOffset, planetaryPositions, houses);
  } else {
    // Generate quarterly predictions for multi-year reports
    return generateQuarterlyPredictions(userData, yearOffset, planetaryPositions, houses);
  }
}

// Generate monthly predictions with detailed sections
function generateMonthlyPredictions(
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
    const relevantPlanets = getRelevantPlanetsForPeriod(index);
    
    return `§${month}§\n\n${generateDetailedPredictionBlock(userData, relevantPlanets, yearOffset, houses, month, index)}`;
  });
}

// Generate quarterly predictions with detailed sections
function generateQuarterlyPredictions(
  userData: BirthData, 
  yearOffset: number,
  planetaryPositions: Record<string, string>,
  houses: Record<string, string>
): string[] {
  const quarters = [
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
    const relevantPlanets = getRelevantPlanetsForPeriod(index);
    
    return `§${quarter.title}§\n\n${generateDetailedPredictionBlock(userData, relevantPlanets, yearOffset, houses, quarter.period, index, quarter.theme)}`;
  });
}

function getRelevantPlanetsForPeriod(periodIndex: number) {
  // Different planetary influences for different periods
  const planetGroups = [
    ["Sun", "Mars", "Jupiter"], // Q1/Jan
    ["Venus", "Moon", "Mercury"], // Q2/Feb
    ["Saturn", "Jupiter", "Venus"], // Q3/Mar
    ["Pluto", "Neptune", "Uranus"] // Q4/Apr
  ];
  
  const groupIndex = periodIndex % 4;
  
  return planetGroups[groupIndex].map(planetName => {
    const planet = planets.find(p => p.name === planetName);
    return {
      name: planetName,
      qualities: planet?.qualities || [],
      influence: planet?.influence || ""
    };
  });
}

function generateDetailedPredictionBlock(
  userData: BirthData,
  relevantPlanets: {name: string; qualities: string[]; influence: string}[],
  yearOffset: number,
  houses: Record<string, string>,
  periodName: string,
  periodIndex: number,
  periodTheme?: string
): string {
  // Select themed influences based on period and planets
  const careerInfluence = generateSectionContent('career', relevantPlanets, periodIndex);
  const financialInfluence = generateSectionContent('financial', relevantPlanets, periodIndex);
  const healthInfluence = generateSectionContent('health', relevantPlanets, periodIndex);
  const personalInfluence = generateSectionContent('personal', relevantPlanets, periodIndex);
  const remedies = generateSectionContent('remedies', relevantPlanets, periodIndex);

  // Select relevant houses for this period
  const houseKeys = Object.keys(houses);
  const relevantHouseKey = houseKeys[(yearOffset + periodIndex) % 12];
  const houseInfluence = `${relevantHouseKey} - ${houses[relevantHouseKey]}`;
  
  const themeDesc = periodTheme ? 
    `Theme: ${periodTheme}\n\n` : 
    "";

  const predictions = [
    themeDesc,
    `**Career & Business**\n${careerInfluence}\n\n`,
    `**Financial Status**\n${financialInfluence}\n\n`,
    `**Health Overview**\n${healthInfluence}\n\n`,
    `**Personal & Family Life**\n${personalInfluence}\n\n`,
    `**Remedies & Spiritual Practices**\n${remedies}\n\n`,
    `Key Astrological House: ${houseInfluence}`
  ].join("");

  return predictions;
}

function generateSectionContent(
  section: 'career' | 'financial' | 'health' | 'personal' | 'remedies',
  planets: {name: string; qualities: string[]}[],
  periodIndex: number
): string {
  // Content libraries for different section types
  const contentMap = {
    career: [
      "Professional growth aligns with your natural talents. Leadership opportunities may arise that showcase your unique abilities. Consider mentorship or specialized training to enhance your expertise.",
      "Workplace dynamics require adaptability. Team projects flourish under your thoughtful contributions. This is an excellent period for networking and establishing meaningful professional connections.",
      "Career transitions receive cosmic support now. Your innovative ideas will gain recognition from authority figures. Focus on long-term goals rather than immediate gratification.",
      "Professional stability increases through disciplined efforts. Documentation and organization are highlighted. A methodical approach to challenges will yield the best results."
    ],
    financial: [
      "Financial prospects improve through strategic planning. Investments in education or skills development return dividends. Avoid impulsive purchases, especially related to technology.",
      "Money management benefits from intuitive decision-making. Unexpected income may arrive through creative endeavors. Review recurring expenses to identify potential savings.",
      "Financial growth comes through collaborative ventures. Partnership opportunities might present lucrative possibilities. Maintain balanced accounts and clear financial boundaries.",
      "Long-term financial security strengthens through disciplined saving. Consider consulting with financial advisors about retirement or property investments. Avoid lending substantial amounts during this period."
    ],
    health: [
      "Vitality increases through movement and outdoor activities. Pay attention to spinal alignment and posture. Incorporating sunlight exposure into your daily routine enhances overall wellbeing.",
      "Emotional health connects directly to physical wellness now. Hydration and proper rest are essential. Consider gentle detoxification practices appropriate for your constitution.",
      "Digestive health benefits from mindful eating practices. Strengthen immunity through balanced nutrition. Active recovery days are as important as your workout sessions.",
      "Nervous system health requires attention. Meditation practices bring notable benefits. Consider holistic approaches that address both physical symptoms and their emotional roots."
    ],
    personal: [
      "Family bonds strengthen through honest communication. A domestic matter reaches positive resolution. Ancestral connections or heritage may feature prominently in your thoughts and activities.",
      "Relationship dynamics shift toward greater authenticity. A significant conversation clears lingering misunderstandings. Creative expression brings joy to your personal interactions.",
      "Community connections enrich your personal life. An important relationship develops greater depth. Consider reviving traditions or rituals that bring meaning to your family gatherings.",
      "Inner growth accelerates through contemplative practices. Boundaries in relationships become clearer and healthier. A past situation finally finds emotional closure, allowing new beginnings."
    ],
    remedies: [
      "Incorporate copper vessels for drinking water. Chanting mantras associated with the Sun (Aditya Hridaya Stotra) or Mars (Om Angarakaya Namaha) brings balance. Wear red coral after proper astrological consultation.",
      "Practice moon meditation on Mondays. Offer white flowers to water bodies. Consider wearing pearl or moonstone jewelry (after proper astrological consultation) to enhance intuitive abilities.",
      "Add yellow items to your environment. Recite Jupiter mantras (Om Gurave Namaha) on Thursdays. Charitable acts toward educational institutions generate positive energy.",
      "Practice Saturn mantras (Om Sham Shanaishcharaya Namaha) on Saturdays. Feeding crows or black animals generates beneficial karma. Service to elders aligns your energies positively."
    ]
  };

  // Select content based on section and period
  const options = contentMap[section];
  const selectedIndex = (periodIndex + planets.length) % options.length;
  return options[selectedIndex];
}

function generateYearSummary(
  userData: BirthData,
  yearOffset: number,
  planetaryPositions: Record<string, string>
): string {
  const yearThemes = [
    "Expansion & New Horizons",
    "Stability & Foundation Building",
    "Communication & Social Connections",
    "Inner Growth & Emotional Healing",
    "Creativity & Self-Expression",
    "Service & Skill Development",
    "Partnership & Relationship Focus",
    "Transformation & Regeneration",
    "Wisdom & Spiritual Development",
    "Achievement & Recognition"
  ];
  
  const favorablePeriods = [
    "January-March and August-October",
    "February-April and November-December",
    "March-June and September-November",
    "April-July and October-January",
    "May-August and December-February"
  ];
  
  const challengingPeriods = [
    "November-December",
    "January-February",
    "July-August",
    "March-April",
    "September-October"
  ];
  
  const recommendedActions = [
    "Expand your knowledge through study or travel. Network with influential people in your field. Create a vision board for your long-term aspirations.",
    "Create structured routines and systems. Focus on health and wellness fundamentals. Strengthen relationships with family members.",
    "Enhance communication skills through courses or practice. Update your digital presence and professional profiles. Reconnect with old friends and colleagues.",
    "Practice regular meditation or journaling. Seek therapeutic support if needed. Create emotional boundaries where necessary.",
    "Invest time in creative hobbies and self-expression. Consider public speaking or performance opportunities. Share your unique perspective with others."
  ];

  const themeIndex = (yearOffset + userData.fullName.length) % yearThemes.length;
  const favorablePeriodIndex = (yearOffset + userData.placeOfBirth.length) % favorablePeriods.length;
  const challengingPeriodIndex = (yearOffset + 3) % challengingPeriods.length;
  const actionIndex = (yearOffset + userData.dateOfBirth.length) % recommendedActions.length;

  return `§Year Summary§\n\n` +
    `**Major Theme:** ${yearThemes[themeIndex]}\n\n` +
    `**Major Highlights:**\n` +
    `This year brings significant developments in your ${getRandomElement(["personal growth", "professional path", "relationship dynamics", "spiritual journey"])}. ` +
    `The transit of ${getRandomElement(Object.keys(planetaryPositions))} through ${getRandomElement(Object.values(planetaryPositions))} ` +
    `creates opportunities for ${getRandomElement(["expansion", "transformation", "healing", "achievement"])} in ways you might not expect. ` +
    `Pay attention to intuitive insights around the ${getRandomElement(["full moon", "new moon", "equinox", "solstice"])} periods.\n\n` +
    
    `**Favorable Periods:** ${favorablePeriods[favorablePeriodIndex]}\n` +
    `**Challenging Periods:** ${challengingPeriods[challengingPeriodIndex]}\n\n` +
    
    `**Recommended Actions:**\n${recommendedActions[actionIndex]}\n\n` +
    
    `Remember that your conscious choices and actions will always be the most powerful factors in creating your destiny. ` +
    `These astrological insights are guides to help you navigate with greater awareness and intention.`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateOverallForecast(userData: BirthData, duration: number): string {
  // Themes based on report type and duration
  const themesByType: Record<string, string[]> = {
    comprehensive: [
      "holistic development across multiple life dimensions",
      "balanced growth in material and spiritual aspects",
      "integration of different life areas into a harmonious whole"
    ],
    career: [
      "professional evolution and skill development",
      "leadership growth and career advancement opportunities",
      "work-life integration and professional fulfillment"
    ],
    relationships: [
      "deeper connection with self and others",
      "healing relationship patterns and establishing healthy boundaries",
      "expansion of your social and intimate connections"
    ],
    health: [
      "mind-body-spirit integration and wellness",
      "preventative health practices and vitality enhancement",
      "establishing sustainable health routines and habits"
    ],
    spiritual: [
      "deeper connection with your higher purpose",
      "expansion of consciousness and spiritual awareness",
      "integration of spiritual wisdom into everyday life"
    ]
  };

  const planetaryPeriods = [
    "Sun mahadasha brings focus to your authentic expression and life purpose",
    "Moon mahadasha highlights emotional patterns and nurturing connections",
    "Mars mahadasha activates your drive, courage, and determination",
    "Mercury mahadasha enhances communication skills and intellectual pursuits",
    "Jupiter mahadasha expands wisdom, abundance, and growth opportunities",
    "Venus mahadasha refines relationships, values, and creative expression",
    "Saturn mahadasha deepens discipline, responsibility, and life lessons",
    "Rahu mahadasha intensifies desires and evolutionary growth edges",
    "Ketu mahadasha supports spiritual detachment and liberation from past patterns"
  ];

  const themes = themesByType[userData.reportType] || themesByType.comprehensive;
  const mainTheme = getRandomElement(themes);
  
  // Select a planet period based on birth data to seem deterministic
  const birthDate = new Date(userData.dateOfBirth);
  const birthSum = birthDate.getFullYear() + birthDate.getMonth() + birthDate.getDate();
  const planetPeriod = planetaryPeriods[birthSum % planetaryPeriods.length];

  // Generate forecast based on duration
  const durationText = duration === 1 ? "year" : "years";
  const intensityLevel = duration <= 3 ? "focused" : "transformative";
  
  return `§Overall ${duration}-Year Forecast§\n\n` +
    `The next ${duration} ${durationText} represent a ${intensityLevel} period of ${mainTheme} in your life journey. ` +
    `The ${planetPeriod}, influencing this entire duration. Vedic astrology reveals this as a significant phase where several planetary transits and dashas converge to create powerful opportunities for evolution.\n\n` +
    
    `**Career & Financial Path:** ${generateSectionContent('career', planets.slice(0, 3), duration)} ${generateSectionContent('financial', planets.slice(3, 6), duration + 1)}\n\n` +
    
    `**Health & Wellbeing:** ${generateSectionContent('health', planets.slice(2, 5), duration + 2)}\n\n` +
    
    `**Relationships & Personal Growth:** ${generateSectionContent('personal', planets.slice(1, 4), duration)}\n\n` +
    
    `**Spiritual Development:** This ${duration}-year cycle supports ${getRandomElement([
      "deeper meditation practices and inner connection",
      "practical application of spiritual principles in daily life",
      "healing ancestral patterns through conscious awareness",
      "expanding your understanding of universal consciousness",
      "integrating spiritual insights with material existence"
    ])}.\n\n` +
    
    `This forecast provides an overview of major themes and influences. The yearly and ${duration > 1 ? "quarterly" : "monthly"} sections that follow offer more specific guidance for navigating each period.`;
}

// Public Mapbox API key for demo purposes. For production, set your own!
const DEMO_MAPBOX_KEY = "pk.eyJ1IjoibG92YWJsZWlsbCIsImEiOiJjanZwdmI1d20wNGZhM3pubnBrZ2drM2xlIn0.ClfC0cuGZ4SKyA9T6ZlPeA";

// Update the main report generation function
export async function generateReport(userData: BirthData): Promise<ReportContent[]> {
  // Extract coordinates from place string using Mapbox forward geocoding
  const getCoordinates = async (place: string): Promise<LocationCoordinates> => {
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
  };

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
        
        ...generatePredictions(userData, i, isYearlyReport),
        
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
