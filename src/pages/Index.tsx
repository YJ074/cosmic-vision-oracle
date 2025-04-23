
import React, { useState } from 'react';
import StarryBackground from '@/components/StarryBackground';
import CosmicHeader from '@/components/CosmicHeader';
import BirthDataForm, { BirthData } from '@/components/BirthDataForm';
import AstrologyReport, { ReportContent } from '@/components/AstrologyReport';
import { generateReport } from '@/utils/reportGenerator';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [userData, setUserData] = useState<BirthData | null>(null);
  const [reportData, setReportData] = useState<ReportContent[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (data: BirthData) => {
    setIsLoading(true);

    // Simulate API call to generate report
    setTimeout(() => {
      try {
        const generatedReport = generateReport(data);
        setUserData(data);
        setReportData(generatedReport);
        toast("Cosmic Vision Generated", {
          description: "Your astrological report is ready to view.",
        });
      } catch (error) {
        console.error("Error generating report:", error);
        toast("Error", {
          description: "The stars are obscured. Please try again.",
          // Removing the `variant` prop, which Sonner does not support.
        });
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden px-4 pb-20">
      <StarryBackground starCount={200} />
      <div className="max-w-6xl mx-auto pt-8 md:pt-16">
        <CosmicHeader 
          title="Cosmic Vision Oracle"
          subtitle="Ancient Vedic Wisdom for Your Future Path"
        />
        <div className="mt-8 md:mt-12 flex flex-col items-center">
          {!reportData ? (
            <>
              <div className="mb-8 max-w-lg text-center">
                <p className="text-cosmic-gold/90 italic font-serif">
                  "The answers you seek are written in the stars. 
                  Provide your birth details to unlock the cosmic wisdom of Vedic astrology."
                </p>
              </div>
              <BirthDataForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </>
          ) : (
            <div className="w-full space-y-6">
              <button 
                onClick={() => {
                  setUserData(null);
                  setReportData(null);
                }}
                className="text-cosmic-gold/80 hover:text-cosmic-gold flex items-center mx-auto mb-6 transition-colors"
              >
                ← Generate Another Report
              </button>
              <AstrologyReport userData={userData!} reportContent={reportData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Index;

