
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BirthData } from './BirthDataForm';

interface AstrologyReportProps {
  userData: BirthData;
  reportContent: ReportContent[];
}

export interface ReportContent {
  year: number;
  predictions: string[];
}

const AstrologyReport: React.FC<AstrologyReportProps> = ({ userData, reportContent }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Card className="cosmic-card w-full max-w-4xl mx-auto">
      <CardHeader className="pb-3 text-center">
        <CardTitle className="text-2xl text-cosmic-gold font-serif">
          {userData.reportType.charAt(0).toUpperCase() + userData.reportType.slice(1)} Cosmic Vision
        </CardTitle>
        <p className="text-cosmic-gold/80 font-serif">
          For {userData.fullName}
        </p>
        <div className="text-sm text-muted-foreground mt-2">
          <p>Birth Details: {new Date(userData.dateOfBirth).toLocaleDateString()} at {userData.timeOfBirth}</p>
          <p>Location: {userData.placeOfBirth}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-cosmic-indigo/30 border border-cosmic-purple/30 rounded-md p-4 text-cosmic-gold/90 italic text-center">
          <p>
            "The planets and stars have aligned to reveal your cosmic path. 
            May this vision guide you through the celestial journey ahead."
          </p>
        </div>
        
        <Separator className="border-cosmic-purple/30" />
        
        {reportContent.map((yearContent, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-xl font-serif font-semibold text-cosmic-gold flex items-center">
              <span className="h-[1px] flex-grow bg-cosmic-purple/30 mr-3"></span>
              {currentYear + yearContent.year - 1}
              <span className="h-[1px] flex-grow bg-cosmic-purple/30 ml-3"></span>
            </h3>
            
            {yearContent.predictions.map((prediction, predIndex) => (
              <p key={predIndex} className="text-foreground leading-relaxed">
                {prediction}
              </p>
            ))}
          </div>
        ))}
        
        <Separator className="border-cosmic-purple/30" />
        
        <div className="bg-cosmic-indigo/30 border border-cosmic-purple/30 rounded-md p-4">
          <h4 className="text-lg font-serif text-cosmic-gold mb-2">Spiritual Recommendations</h4>
          <ul className="list-disc pl-5 space-y-1 text-foreground">
            <li>Daily meditation focusing on the {getRecommendedPlanet(userData)} energy</li>
            <li>Wear {getRecommendedColor(userData)} on {getRecommendedDay(userData)}</li>
            <li>Chant the mantra "{getRecommendedMantra(userData)}" 108 times weekly</li>
            <li>Practice gratitude during the waxing moon phase</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions to generate personalized recommendations based on birth data
function getRecommendedPlanet(userData: BirthData): string {
  const planets = ["Jupiter", "Venus", "Mercury", "Moon", "Saturn", "Sun", "Mars"];
  const nameSum = userData.fullName.length;
  return planets[nameSum % planets.length];
}

function getRecommendedColor(userData: BirthData): string {
  const colors = ["yellow", "blue", "green", "white", "purple", "red", "orange"];
  const dobSum = new Date(userData.dateOfBirth).getDate();
  return colors[dobSum % colors.length];
}

function getRecommendedDay(userData: BirthData): string {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const placeSum = userData.placeOfBirth.length;
  return days[placeSum % days.length];
}

function getRecommendedMantra(userData: BirthData): string {
  const mantras = [
    "Om Gurave Namaha",
    "Om Namah Shivaya",
    "Om Namo Bhagavate Vasudevaya",
    "Om Gam Ganapataye Namaha",
    "Om Aim Saraswatyai Namaha"
  ];
  const combinedLength = userData.fullName.length + userData.placeOfBirth.length;
  return mantras[combinedLength % mantras.length];
}

export default AstrologyReport;
