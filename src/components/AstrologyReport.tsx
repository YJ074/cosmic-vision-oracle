
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BirthData } from './BirthDataForm';
import { format, parse } from 'date-fns';
import { toast } from '@/components/ui/sonner';

interface AstrologyReportProps {
  userData: BirthData;
  reportContent: ReportContent[];
}

export interface ReportContent {
  year: number;
  predictions: string[];
}

const AstrologyReport: React.FC<AstrologyReportProps> = ({ userData, reportContent }) => {
  // Function to convert 24-hour time to 12-hour format with AM/PM
  const formatTime = (timeString: string) => {
    try {
      console.log('Formatting time:', timeString);
      const parsedTime = parse(timeString, 'HH:mm', new Date());
      console.log('Parsed time:', parsedTime);
      const formattedTime = format(parsedTime, 'h:mm a');
      console.log('Formatted time:', formattedTime);
      return formattedTime;
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeString; // Fallback to original time if formatting fails
    }
  };

  // Log birth time on component mount
  useEffect(() => {
    if (userData?.timeOfBirth) {
      const formattedTime = formatTime(userData.timeOfBirth);
      console.log(`Birth Time: ${userData.timeOfBirth} → ${formattedTime}`);
    }
  }, [userData]);

  // Function to process text and convert section markers to headings
  const formatPredictionText = (text: string) => {
    if (text.includes('§')) {
      const [title, ...content] = text.split('§');
      return (
        <div className="mb-6">
          <h3 className="text-xl font-serif font-semibold text-cosmic-gold mb-3">
            {title.trim()}
          </h3>
          <div className="text-foreground leading-relaxed space-y-4">
            {content.join('').split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>
      );
    }
    return <p className="text-foreground leading-relaxed">{text}</p>;
  };

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
          <p>Birth Details: {new Date(userData.dateOfBirth).toLocaleDateString()} at {formatTime(userData.timeOfBirth)}</p>
          <p>Location: {userData.placeOfBirth}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-cosmic-indigo/30 border border-cosmic-purple/30 rounded-md p-4 text-cosmic-gold/90 italic text-center">
          <p>
            "The celestial bodies have aligned to reveal your cosmic path.
            May these insights guide you through the journey ahead."
          </p>
        </div>
        
        <Separator className="border-cosmic-purple/30" />
        
        {reportContent.map((yearContent, index) => (
          <div key={index} className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-cosmic-gold flex items-center">
              <span className="h-[1px] flex-grow bg-cosmic-purple/30 mr-3"></span>
              {yearContent.year}
              <span className="h-[1px] flex-grow bg-cosmic-purple/30 ml-3"></span>
            </h3>
            
            {yearContent.predictions.map((prediction, predIndex) => (
              <div key={predIndex} className="space-y-4">
                {formatPredictionText(prediction)}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AstrologyReport;
