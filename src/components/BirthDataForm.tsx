
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TimeInput, { TimeInputValue } from "./TimeInput";
import ReportTypeSelect from "./ReportTypeSelect";
import DurationSelect from "./DurationSelect";

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
function to24Hour(hour: string, minute: string, ampm: "AM" | "PM") {
  let h = parseInt(hour, 10);
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const hh = h.toString().padStart(2, "0");
  const mm = minute.padStart(2, "0");
  return `${hh}:${mm}`;
}

// Helper to split "HH:mm" to { hour, minute, ampm }
function from24Hour(time24: string): TimeInputValue {
  if (!time24) return { hour: "12", minute: "00", ampm: "AM" };
  const [h, m] = time24.split(":");
  let hour = parseInt(h, 10);
  const minute = m;
  let ampm: "AM" | "PM" = "AM";
  if (hour === 0) hour = 12;
  else if (hour === 12) ampm = "PM";
  else if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  }
  return { hour: hour.toString().padStart(2, "0"), minute, ampm };
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = React.useState<BirthData>({
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    reportType: 'comprehensive',
    duration: 1
  });

  // Controlled inputs for time entry in 12-hour format
  const from24HourInner = (time24: string): TimeInputValue => {
    if (!time24) return { hour: "12", minute: "00", ampm: "AM" };
    const [h, m] = time24.split(":");
    let hour = parseInt(h, 10);
    const minute = m;
    let ampm: "AM" | "PM" = "AM";
    if (hour === 0) hour = 12;
    else if (hour === 12) ampm = "PM";
    else if (hour > 12) {
      hour = hour - 12;
      ampm = "PM";
    }
    return { hour: hour.toString().padStart(2, "0"), minute, ampm: ampm };
  };

  const to24HourInner = (hour: string, minute: string, ampm: "AM" | "PM") => {
    let h = parseInt(hour, 10);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    const hh = h.toString().padStart(2, "0");
    const mm = minute.padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const timeInput = from24HourInner(formData.timeOfBirth);

  const handleTimeInputChange = (val: TimeInputValue) => {
    setFormData(prev => ({
      ...prev,
      timeOfBirth: to24HourInner(val.hour, val.minute, val.ampm),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: "reportType" | "duration", value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
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
      <TimeInput value={timeInput} onChange={handleTimeInputChange} />
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
      <ReportTypeSelect 
        value={formData.reportType}
        onChange={val => handleSelectChange("reportType", val)}
      />
      <DurationSelect
        value={formData.duration}
        onChange={val => handleSelectChange("duration", val)}
      />
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
