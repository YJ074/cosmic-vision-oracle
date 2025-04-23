
import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ReportTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReportTypeSelect({ value, onChange }: ReportTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="reportType" className="text-cosmic-gold">Report Type</Label>
      <Select value={value} onValueChange={onChange}>
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
  );
}

export default ReportTypeSelect;
