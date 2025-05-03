
import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DurationSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export function DurationSelect({ value, onChange }: DurationSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="duration" className="text-cosmic-gold">Duration (Years)</Label>
      <Select
        value={value.toString()}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="cosmic-input">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Year</SelectItem>
          <SelectItem value="2">2 Years</SelectItem>
          <SelectItem value="3">3 Years</SelectItem>
          <SelectItem value="4">4 Years</SelectItem>
          <SelectItem value="5">5 Years</SelectItem>
          <SelectItem value="7">7 Years</SelectItem>
          <SelectItem value="10">10 Years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default DurationSelect;
