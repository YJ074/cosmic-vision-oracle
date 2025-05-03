
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Search, Info } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { IndiaLocationData, getAllStates, getDistrictsInState, searchIndiaLocations } from "@/utils/report/indiaGeoData";

interface IndiaLocationPickerProps {
  value: string;
  onChange: (locationName: string, coordinates?: {lat: number; lng: number}) => void;
}

const IndiaLocationPicker: React.FC<IndiaLocationPickerProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IndiaLocationData[]>([]);
  const [allStates, setAllStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  
  // Load states on component mount
  useEffect(() => {
    setAllStates(getAllStates());
  }, []);
  
  // Update districts when state changes
  useEffect(() => {
    if (selectedState) {
      setDistricts(getDistrictsInState(selectedState));
    } else {
      setDistricts([]);
    }
  }, [selectedState]);
  
  // Update query when value changes from outside
  useEffect(() => {
    if (value && value !== query) {
      setQuery(value);
    }
  }, [value]);
  
  // Handle search
  const handleSearch = () => {
    if (!query && !selectedState && !selectedDistrict) {
      toast.error("Please enter a location name or select a state/district");
      return;
    }
    
    const results = searchIndiaLocations({
      name: query,
      state: selectedState,
      district: selectedDistrict
    });
    
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.info("No locations found matching your criteria");
    }
  };
  
  // Handle location selection
  const handleSelectLocation = (location: IndiaLocationData) => {
    const locationName = `${location.name}, ${location.district}, ${location.state}`;
    setQuery(locationName);
    onChange(locationName, { lat: location.lat, lng: location.lng });
    setSearchResults([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-cosmic-gold">India Location Finder</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4 text-cosmic-gold/70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 text-sm">
            <p>This database contains comprehensive location data for Indian cities, towns, and villages with accurate coordinates for astrological calculations.</p>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="cosmic-input">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any State</SelectItem>
            {allStates.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={selectedDistrict} 
          onValueChange={setSelectedDistrict}
          disabled={!selectedState}
        >
          <SelectTrigger className="cosmic-input">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any District</SelectItem>
            {districts.map(district => (
              <SelectItem key={district} value={district}>{district}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="cosmic-input pl-10"
            placeholder="City or Village name"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-cosmic-gold pointer-events-none">
            <MapPin size={20} />
          </span>
        </div>
        <Button 
          onClick={handleSearch} 
          className="cosmic-button"
          size="icon"
        >
          <Search size={18} />
        </Button>
      </div>
      
      {/* Search results */}
      {searchResults.length > 0 && (
        <div className="border border-cosmic-purple/20 rounded-md bg-cosmic-indigo/20 max-h-60 overflow-y-auto">
          {searchResults.map((location, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-2 hover:bg-cosmic-purple/20 flex justify-between items-center border-b border-cosmic-purple/10 last:border-0"
              onClick={() => handleSelectLocation(location)}
            >
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-cosmic-gold/70">{location.district}, {location.state}</div>
              </div>
              {location.pinCode && (
                <div className="text-xs bg-cosmic-indigo/50 px-2 py-1 rounded">
                  PIN: {location.pinCode}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndiaLocationPicker;
