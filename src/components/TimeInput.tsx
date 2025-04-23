
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface TimeInputValue {
  hour: string;
  minute: string;
  ampm: "AM" | "PM";
}

interface TimeInputProps {
  value: TimeInputValue;
  onChange: (value: TimeInputValue) => void;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/, "");
    if (val === "" || Number(val) < 1) val = "1";
    if (Number(val) > 12) val = "12";
    onChange({ ...value, hour: val.padStart(2, "0") });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/, "");
    if (val === "" || Number(val) < 0) val = "00";
    if (Number(val) > 59) val = "59";
    onChange({ ...value, minute: val.padStart(2, "0") });
  };

  const handleAMPMChange = (val: "AM" | "PM") => {
    onChange({ ...value, ampm: val });
  };

  return (
    <div className="space-y-2">
      <Label className="text-cosmic-gold">Time of Birth (12-hour format)</Label>
      <div className="flex space-x-2 items-center">
        <Input
          name="hour"
          type="number"
          min={1}
          max={12}
          value={value.hour}
          required
          onChange={handleHourChange}
          placeholder="HH"
          className="cosmic-input w-16 text-center"
        />
        <span className="text-cosmic-gold font-semibold">:</span>
        <Input
          name="minute"
          type="number"
          min={0}
          max={59}
          value={value.minute}
          required
          onChange={handleMinuteChange}
          placeholder="MM"
          className="cosmic-input w-16 text-center"
        />
        <Select value={value.ampm} onValueChange={handleAMPMChange}>
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
  );
}

export default TimeInput;
