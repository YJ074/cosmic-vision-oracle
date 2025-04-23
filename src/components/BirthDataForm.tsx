
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface BirthData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string; // always stored as "HH:mm" in 24-hour format
  placeOfBirth: string;
  reportType: string;
  duration: number;
}

interface BirthDataFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading?: boolean;
}

// Helper to convert 12-hour time to 24-hour "HH:mm" string
function to24Hour(hour: string, minute: string, ampm: string) {
  let h = parseInt(hour, 10);
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const hh = h.toString().padStart(2, "0");
  const mm = minute.padStart(2, "0");
  return `${hh}:${mm}`;
}

// Helper to split "HH:mm" to { hour, minute, ampm }
function from24Hour(time24: string) {
  if (!time24) return { hour: "12", minute: "00", ampm: "AM" };
  const [h, m] = time24.split(":");
  let hour = parseInt(h, 10);
  const minute = m;
  let ampm = "AM";
  if (hour === 0) hour = 12;
  else if (hour === 12) ampm = "PM";
  else if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  }
  return { hour: hour.toString().padStart(2, "0"), minute, ampm };
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<BirthData>({
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '', // will be set via hour/minute/ampm fields
    placeOfBirth: '',
    reportType: 'comprehensive',
    duration: 1
  });

  // Controlled inputs for time entry in 12-hour format
  const { hour, minute, ampm } = from24Hour(formData.timeOfBirth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // For the new time fields
  const handleTimeChange = (name: string, value: string) => {
    const new = { hour, minute, ampm, [name]: value };
    setFormData(prev => ({
      ...prev,
      timeOfBirth: to24Hour(new.hour, new.minute, new.ampm)
    }));
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
        <Label className="text-cosmic-gold">Time of Birth (12-hour format)</Label>
        <div className="flex space-x-2 items-center">
          <Input
            name="hour"
            type="number"
            min={1}
            max={12}
            value={hour}
            required
            onChange={e => {
              let val = e.target.value.replace(/\D/, '');
              if (val === "" || Number(val) < 1) val = "1";
              if (Number(val) > 12) val = "12";
              handleTimeChange("hour", val);
            }}
            placeholder="HH"
            className="cosmic-input w-16 text-center"
          />
          <span className="text-cosmic-gold font-semibold">:</span>
          <Input
            name="minute"
            type="number"
            min={0}
            max={59}
            value={minute}
            required
            onChange={e => {
              let val = e.target.value.replace(/\D/, '');
              if (val === "" || Number(val) < 0) val = "00";
              if (Number(val) > 59) val = "59";
              handleTimeChange("minute", val.padStart(2, "0"));
            }}
            placeholder="MM"
            className="cosmic-input w-16 text-center"
          />
          <Select value={ampm} onValueChange={val => handleTimeChange("ampm", val)}>
            <SelectTrigger className="cosmic-input w-20 text-center">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
