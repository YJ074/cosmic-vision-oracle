
import { BirthData } from "@/components/BirthDataForm";
import { ReportContent } from "@/components/AstrologyReport";

// Generate a report based on the user's birth data
export function generateReport(userData: BirthData): ReportContent[] {
  const result: ReportContent[] = [];
  
  // Generate prediction for each year in the duration
  for (let i = 1; i <= userData.duration; i++) {
    const yearContent: ReportContent = {
      year: i,
      predictions: generateYearPredictions(userData, i)
    };
    
    result.push(yearContent);
  }
  
  return result;
}

// Generate predictions for a specific year
function generateYearPredictions(userData: BirthData, yearOffset: number): string[] {
  const predictions: string[] = [];
  
  // Generate predictions based on report type
  switch (userData.reportType) {
    case 'comprehensive':
      predictions.push(
        `The planetary alignments show that ${yearOffset === 1 ? 'this' : 'the'} year marks a significant shift in your cosmic journey. Jupiter's alignment with your natal chart suggests expansion in multiple areas of life, particularly in ${getRandomArea()} and ${getRandomArea()}.`,
        `The transit of Saturn through your ${getRandomHouse()} house brings valuable lessons related to ${getRandomTheme()}. This is a period of ${yearOffset % 2 === 0 ? 'introspection and inner growth' : 'action and external achievement'}, especially during the months of ${getRandomMonth()} and ${getRandomMonth()}.`,
        `Your ruling planet's position indicates an opportunity to ${getRandomOpportunity()}. Pay special attention to signs and synchronicities around the ${getRandomDay()} of each month, as these may guide important decisions.`
      );
      break;
    case 'career':
      predictions.push(
        `Professional growth looks promising as Mars energizes your career house. Expect new opportunities to ${getRandomCareerOpportunity()} between ${getRandomMonth()} and ${getRandomMonth()}.`,
        `Financial patterns show a ${yearOffset % 3 === 0 ? 'period of accumulation' : 'time for strategic investments'}. The influence of Mercury in your wealth sector suggests paying attention to ${getRandomFinancialAdvice()}. A significant career development may occur when Venus transits your tenth house.`,
        `Your natural talents in ${getRandomTalent()} will be particularly valuable this year. Consider developing skills related to ${getRandomSkill()}, as these will become increasingly important over the next ${userData.duration - yearOffset + 1} years.`
      );
      break;
    case 'relationships':
      predictions.push(
        `Venus brings a harmonious influence to your relationships this year. If single, favorable encounters may occur during ${getRandomMonth()}, particularly with someone connected to ${getRandomActivity()}.`,
        `For those in committed relationships, Saturn's influence creates an opportunity for deepening bonds through ${getRandomRelationshipTheme()}. Communication becomes especially important during ${getRandomMonth()}'s lunar eclipse, which activates your partnership house.`,
        `Family relationships benefit from Jupiter's expansive energy, healing old wounds related to ${getRandomFamilyTheme()}. A significant celebration or gathering around ${getRandomMonth()} brings family members closer together.`
      );
      break;
    case 'health':
      predictions.push(
        `Your vitality is influenced by the Sun's transit through your health house. Focus on strengthening your ${getRandomBodySystem()} through ${getRandomHealthActivity()}, especially during ${getRandomMonth()}.`,
        `Mars energy may create tension in your ${getRandomBodyPart()} area. Preventative measures like ${getRandomHealthPractice()} will be particularly beneficial. Pay attention to subtle signals from your body during the waning moon phases.`,
        `Your emotional wellbeing is highlighted by the Moon's influence. Developing practices that support ${getRandomEmotionalHealth()} will create a foundation for overall wellness, particularly important during periods of stress in ${getRandomMonth()}.`
      );
      break;
    case 'spiritual':
      predictions.push(
        `Neptune's mystical influence opens doors to higher consciousness this year. Your spiritual sensitivity increases, particularly around the ${getRandomDay()} of ${getRandomMonth()}, when meditation may yield profound insights.`,
        `Ketu's position suggests releasing attachments to ${getRandomAttachment()}, allowing spiritual growth through ${getRandomSpiritualPractice()}. A spiritual teacher or guide may enter your life during ${getRandomMonth()}, bringing important lessons.`,
        `Your past life karma related to ${getRandomKarma()} begins to resolve this year, creating space for soul evolution. Sacred texts relating to ${getRandomPhilosophy()} will provide valuable wisdom, especially during periods of contemplation.`
      );
      break;
    default:
      predictions.push(
        `The cosmic forces align to bring significant developments in your life path this year. Pay particular attention to opportunities that arise during ${getRandomMonth()}.`,
        `Your personal growth accelerates as Jupiter forms a favorable aspect to your natal Sun. This energy supports expansion in areas related to ${getRandomArea()} and ${getRandomArea()}.`,
        `The karmic patterns in your chart suggest this is a year for ${yearOffset % 2 === 0 ? 'gathering wisdom' : 'applying knowledge'}. Trust your intuition, especially around the full moons in ${getRandomMonth()} and ${getRandomMonth()}.`
      );
  }
  
  return predictions;
}

// Helper functions to generate random elements for the predictions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomMonth(): string {
  return getRandomElement(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
}

function getRandomDay(): string {
  return getRandomElement(['first', 'second', 'third', 'seventh', 'tenth', 'fifteenth', 'twenty-first', 'twenty-eighth']);
}

function getRandomArea(): string {
  return getRandomElement(['personal growth', 'financial matters', 'creative expression', 'spiritual development', 'family connections', 'educational pursuits', 'career advancement', 'community involvement']);
}

function getRandomHouse(): string {
  return getRandomElement(['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth']);
}

function getRandomTheme(): string {
  return getRandomElement(['patience', 'discipline', 'communication', 'boundaries', 'trust', 'authenticity', 'generosity', 'resilience']);
}

function getRandomOpportunity(): string {
  return getRandomElement(['develop leadership skills', 'expand your social network', 'deepen spiritual practices', 'explore creative talents', 'strengthen family bonds', 'improve financial literacy', 'learn a new skill', 'contribute to your community']);
}

function getRandomCareerOpportunity(): string {
  return getRandomElement(['take on a leadership role', 'collaborate on an innovative project', 'receive recognition for past efforts', 'expand your professional network', 'develop a new skill set', 'negotiate a better position', 'start your own venture']);
}

function getRandomFinancialAdvice(): string {
  return getRandomElement(['long-term investments', 'diversifying assets', 'clearing old debts', 'creating passive income streams', 'mindful spending habits', 'educational investments', 'ethical investment opportunities']);
}

function getRandomTalent(): string {
  return getRandomElement(['communication', 'analytical thinking', 'creativity', 'interpersonal relations', 'strategic planning', 'detailed execution', 'innovation', 'empathic understanding']);
}

function getRandomSkill(): string {
  return getRandomElement(['digital technologies', 'emotional intelligence', 'conflict resolution', 'public speaking', 'creative writing', 'financial analysis', 'project management', 'holistic thinking']);
}

function getRandomActivity(): string {
  return getRandomElement(['creative pursuits', 'educational environments', 'spiritual gatherings', 'travel experiences', 'charitable work', 'cultural events', 'athletic activities', 'professional development']);
}

function getRandomRelationshipTheme(): string {
  return getRandomElement(['honest communication', 'shared goals', 'respecting boundaries', 'vulnerability', 'quality time together', 'supporting individual growth', 'deepening intimacy', 'balancing independence']);
}

function getRandomFamilyTheme(): string {
  return getRandomElement(['childhood experiences', 'generational patterns', 'parental relationships', 'sibling dynamics', 'family traditions', 'home environment', 'cultural heritage', 'emotional expression']);
}

function getRandomBodySystem(): string {
  return getRandomElement(['digestive system', 'respiratory function', 'circulatory health', 'immune response', 'nervous system', 'skeletal structure', 'muscular tone', 'hormonal balance']);
}

function getRandomHealthActivity(): string {
  return getRandomElement(['mindful eating', 'regular physical activity', 'adequate hydration', 'quality sleep', 'stress reduction practices', 'connecting with nature', 'breathwork', 'proper posture']);
}

function getRandomBodyPart(): string {
  return getRandomElement(['neck and shoulders', 'lower back', 'digestive organs', 'respiratory system', 'joints', 'circulatory system', 'head', 'throat']);
}

function getRandomHealthPractice(): string {
  return getRandomElement(['preventative care', 'balanced nutrition', 'specific stretches', 'adequate rest', 'regular movement', 'mindfulness practices', 'proper hydration', 'traditional remedies']);
}

function getRandomEmotionalHealth(): string {
  return getRandomElement(['emotional resilience', 'stress management', 'healthy boundaries', 'expressive communication', 'self-compassion', 'mindfulness practices', 'joy and gratitude', 'social connection']);
}

function getRandomAttachment(): string {
  return getRandomElement(['material outcomes', 'external validation', 'rigid beliefs', 'past regrets', 'future anxieties', 'personal identity', 'control', 'perfectionism']);
}

function getRandomSpiritualPractice(): string {
  return getRandomElement(['regular meditation', 'sacred rituals', 'devotional practices', 'contemplative reading', 'energy work', 'nature connection', 'dream analysis', 'mantra repetition']);
}

function getRandomKarma(): string {
  return getRandomElement(['service and giving', 'truth and integrity', 'relationships and trust', 'power and leadership', 'knowledge and wisdom', 'creative expression', 'material resources', 'healing and transformation']);
}

function getRandomPhilosophy(): string {
  return getRandomElement(['Vedanta', 'Yoga Sutras', 'Bhagavad Gita', 'Buddhist teachings', 'Jyotish wisdom', 'Upanishads', 'Tantric philosophies', 'Ayurvedic principles']);
}
