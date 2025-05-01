
import React, { useState } from 'react';
import BirthDataForm, { BirthData } from '@/components/BirthDataForm';

interface BirthDataFormWrapperProps {
  onSubmit: (data: BirthData & { coordinates?: {lat: number, lng: number} }) => void;
  isLoading: boolean;
}

const BirthDataFormWrapper: React.FC<BirthDataFormWrapperProps> = ({ onSubmit, isLoading }) => {
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | undefined>(undefined);
  
  // Handle the updated place data with coordinates
  const handlePlaceChange = (placeName: string, coords?: {lat: number, lng: number}) => {
    if (coords) {
      console.log("Setting coordinates:", coords);
      setCoordinates(coords);
    }
  };
  
  // Enhance the original form submission with coordinates
  const handleFormSubmit = (data: BirthData) => {
    const enhancedData = {
      ...data,
      coordinates
    };
    console.log("Submitting with coordinates:", enhancedData);
    onSubmit(enhancedData);
  };

  return (
    <BirthDataForm 
      onSubmit={handleFormSubmit} 
      isLoading={isLoading}
      onPlaceChange={handlePlaceChange}
    />
  );
};

export default BirthDataFormWrapper;
