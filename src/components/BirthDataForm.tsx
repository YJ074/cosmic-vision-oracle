
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface BirthData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  reportType: string;
  duration: number;
}

interface BirthDataFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading?: boolean;
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<BirthData>({
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    reportType: 'comprehensive',
    duration: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: name === 'duration' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="cosmic-card p-6 space-y-4 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-cosmic-gold">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          className="cosmic-input"
          placeholder="Your Full Name"
          required
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="text-cosmic-gold">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          className="cosmic-input"
          required
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="timeOfBirth" className="text-cosmic-gold">Time of Birth</Label>
        <Input
          id="timeOfBirth"
          name="timeOfBirth"
          type="time"
          className="cosmic-input"
          required
          value={formData.timeOfBirth}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="placeOfBirth" className="text-cosmic-gold">Place of Birth</Label>
        <Input
          id="placeOfBirth"
          name="placeOfBirth"
          className="cosmic-input"
          placeholder="City, Country"
          required
          value={formData.placeOfBirth}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reportType" className="text-cosmic-gold">Report Type</Label>
        <Select 
          value={formData.reportType} 
          onValueChange={(value) => handleSelectChange('reportType', value)}
        >
          <SelectTrigger className="cosmic-input">
            <SelectValue placeholder="Select Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comprehensive">Comprehensive</SelectItem>
            <SelectItem value="career">Career & Finance</SelectItem>
            <SelectItem value="relationships">Relationships</SelectItem>
            <SelectItem value="health">Health & Wellness</SelectItem>
            <SelectItem value="spiritual">Spiritual Growth</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-cosmic-gold">Duration (Years)</Label>
        <Select
          value={formData.duration.toString()}
          onValueChange={(value) => handleSelectChange('duration', value)}
        >
          <SelectTrigger className="cosmic-input">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Year</SelectItem>
            <SelectItem value="3">3 Years</SelectItem>
            <SelectItem value="5">5 Years</SelectItem>
            <SelectItem value="7">7 Years</SelectItem>
            <SelectItem value="10">10 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type="submit" 
        className="cosmic-button w-full mt-6" 
        disabled={isLoading}
      >
        {isLoading ? 'Consulting the Stars...' : 'Generate Cosmic Vision'}
      </Button>
    </form>
  );
};

export default BirthDataForm;
