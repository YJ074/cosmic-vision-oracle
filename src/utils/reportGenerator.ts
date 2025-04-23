
import { BirthData } from "@/components/BirthDataForm";
import { ReportContent } from "@/components/AstrologyReport";

// Helper function to get current season based on month
function getCurrentSeason(month: number): string {
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  if (month >= 9 && month <= 11) return "Autumn";
  return "Winter";
}

// Generate quarterly predictions with specific themes
function generateQuarterlyPredictions(userData: BirthData, yearOffset: number): string[] {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentSeason = getCurrentSeason(currentMonth);
  
  const quarters = [
    {
      title: "Q1: Initiation & New Beginnings",
      themes: ["personal growth", "spiritual awakening", "fresh opportunities"]
    },
    {
      title: "Q2: Development & Integration",
      themes: ["relationship dynamics", "skill mastery", "emotional balance"]
    },
    {
      title: "Q3: Manifestation & Achievement",
      themes: ["career progress", "material gains", "social connections"]
    },
    {
      title: "Q4: Reflection & Transformation",
      themes: ["spiritual deepening", "inner wisdom", "future planning"]
    }
  ];

  return quarters.map((quarter, index) => {
    const planetaryInfluence = getPlanetaryInfluence(index);
    return `§${quarter.title}§\n\n${generateQuarterContent(userData, quarter.themes, planetaryInfluence, yearOffset)}`;
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
  planetaryInfluence: string,
  yearOffset: number
): string {
  const predictions = [
    `As ${planetaryInfluence}, you'll experience significant developments in ${themes.join(" and ")}. `,
    `This period brings opportunities for growth through ${getRandomElement(supportiveActivities)}. `,
    `Focus on ${getRandomElement(spiritualPractices)} to enhance your journey. `,
    generateTypeSpecificContent(userData.reportType)
  ].join("");

  return predictions;
}

const supportiveActivities = [
  "meditation and self-reflection",
  "learning from spiritual texts",
  "connecting with like-minded individuals",
  "practicing mindfulness in daily activities",
  "engaging in creative expression"
];

const spiritualPractices = [
  "developing a regular spiritual practice",
  "maintaining emotional balance",
  "cultivating inner wisdom",
  "strengthening your connection to higher guidance",
  "practicing gratitude and compassion"
];

function generateTypeSpecificContent(reportType: string): string {
  const contentMap: { [key: string]: string[] } = {
    comprehensive: [
      "Your overall growth path shows promising developments.",
      "Multiple areas of life will experience positive transformation.",
      "Balance material and spiritual aspects for optimal progress."
    ],
    career: [
      "Professional opportunities align with your natural talents.",
      "Leadership qualities will be highlighted and recognized.",
      "Financial planning brings positive results."
    ],
    relationships: [
      "Deeper connections develop through authentic communication.",
      "Family bonds strengthen through shared experiences.",
      "New meaningful relationships enter your life."
    ],
    health: [
      "Holistic wellness approaches bring lasting benefits.",
      "Mental and physical balance improves significantly.",
      "New healthy habits take root and flourish."
    ],
    spiritual: [
      "Spiritual insights lead to profound personal transformation.",
      "Ancient wisdom provides guidance for modern challenges.",
      "Meditation practices deepen your cosmic connection."
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

  // Generate prediction for each year in the duration
  for (let i = 1; i <= userData.duration; i++) {
    const yearContent: ReportContent = {
      year: currentYear + i - 1,
      predictions: [
        "§Introduction§\n\n" +
        `Based on your Vedic birth chart analysis, this ${i === 1 ? "first" : "coming"} year holds significant potential for growth and transformation. The planetary configurations suggest a period of ${i % 2 === 0 ? "internal development" : "external manifestation"}.`,
        ...generateQuarterlyPredictions(userData, i),
        "§Spiritual Guidance & Remedies§\n\n" +
        `To harmonize with these cosmic energies:\n` +
        `• Incorporate ${getRandomElement(supportiveActivities)} into your routine\n` +
        `• Practice ${getRandomElement(spiritualPractices)} regularly\n` +
        `• Pay special attention to your spiritual growth during ${getRandomElement(["full moons", "new moons", "eclipses", "retrograde periods"])}\n\n` +
        `Remember, these celestial insights are guides for your journey. Your free will and conscious choices shape your path forward.`
      ]
    };
    result.push(yearContent);
  }

  return result;
}
