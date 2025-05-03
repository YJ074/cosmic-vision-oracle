
import { BirthData } from "@/components/BirthDataForm";
import { getRandomElement } from "./helpers";
import { generateSectionContent } from "./contentGenerator";
import { planets } from "./planetaryData";

// Generate yearly summary
export function generateYearSummary(
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

// Generate overall forecast for the entire duration
export function generateOverallForecast(userData: BirthData, duration: number): string {
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
