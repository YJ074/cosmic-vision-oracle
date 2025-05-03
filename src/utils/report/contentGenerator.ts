
import { BirthData } from "@/components/BirthDataForm";
import { Planet, SectionType } from "./types";
import { getRandomElement } from "./helpers";

// Get relevant planets for each period
export function getRelevantPlanetsForPeriod(periodIndex: number): Array<Partial<Planet>> {
  // Different planetary influences for different periods
  const planetGroups = [
    ["Sun", "Mars", "Jupiter"], // Q1/Jan
    ["Venus", "Moon", "Mercury"], // Q2/Feb
    ["Saturn", "Jupiter", "Venus"], // Q3/Mar
    ["Pluto", "Neptune", "Uranus"] // Q4/Apr
  ];
  
  const groupIndex = periodIndex % 4;
  
  return planetGroups[groupIndex].map(planetName => {
    return {
      name: planetName,
      qualities: [],
      influence: ""
    };
  });
}

// Generate content for different sections of the prediction
export function generateSectionContent(
  section: SectionType,
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

// Generate detailed prediction block for a period
export function generateDetailedPredictionBlock(
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
