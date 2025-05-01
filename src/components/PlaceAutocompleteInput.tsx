
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Compass } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PlaceAutocompleteInputProps {
  value: string;
  onChange: (val: string, coordinates?: {lat: number, lng: number}) => void;
}

interface LocationData {
  placeName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const PlaceAutocompleteInput: React.FC<PlaceAutocompleteInputProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiKeyError, setApiKeyError] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    
    if (!apiKey) {
      setApiKeyError(true);
      return;
    }

    setApiKeyError(false);
    const fetchSuggestions = async () => {
      try {
        const resp = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${apiKey}&autocomplete=true&types=place,locality,region,country`
        );
        
        if (!resp.ok) {
          console.error('Error fetching suggestions:', resp.status, resp.statusText);
          setApiKeyError(true);
          setSuggestions([]);
          setIsOpen(false);
          return;
        }
        
        const data = await resp.json();
        setSuggestions(data.features || []);
        setIsOpen((data.features || []).length > 0);
      } catch (e) {
        console.error('Error fetching suggestions:', e);
        setSuggestions([]);
        setIsOpen(false);
      }
    };
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query, apiKey]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSelect = (place: any) => {
    const locationData: LocationData = {
      placeName: place.place_name,
      coordinates: {
        lng: place.center[0],
        lat: place.center[1]
      }
    };
    
    setSelectedLocation(locationData);
    setQuery(place.place_name);
    onChange(place.place_name, locationData.coordinates);
    setIsOpen(false);
    
    console.log('Selected location:', locationData);
  };

  return (
    <div className="relative space-y-2">
      {apiKey ? (
        <div className="relative">
          <Input
            ref={inputRef}
            autoComplete="off"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              onChange(e.target.value); // let parent know for controlled forms
            }}
            className="cosmic-input pl-10"
            placeholder="City, Country"
            onFocus={() => setIsOpen(suggestions.length > 0)}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-cosmic-gold pointer-events-none">
            <MapPin size={20} />
          </span>
          
          {selectedLocation && (
            <div className="mt-2 text-xs text-cosmic-gold/80 flex items-center gap-1">
              <Compass size={14} />
              <span>Coordinates: {selectedLocation.coordinates.lat.toFixed(4)}°, {selectedLocation.coordinates.lng.toFixed(4)}°</span>
            </div>
          )}
        </div>
      ) : (
        <Alert className="bg-cosmic-indigo/30 border border-cosmic-purple/20">
          <div className="text-sm text-cosmic-gold/90">
            <p className="mb-2">For accurate astrological calculations, please enter your Mapbox API key below:</p>
            <p className="text-xs mb-4">
              You can get a free API key from <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">Mapbox</a>.
              This enables precise planetary calculations based on your birth location's coordinates.
            </p>
          </div>
        </Alert>
      )}

      {/* Mapbox API Key Input */}
      <div className="space-y-1">
        <Input
          placeholder="Enter Mapbox API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          className={`cosmic-input ${apiKeyError ? "border-red-500" : ""}`}
          type="password"
        />
        {apiKeyError && (
          <p className="text-red-500 text-xs">Invalid API key. Please check your Mapbox token.</p>
        )}
        <div className="text-xs text-muted-foreground">
          Your API key is required for location services. Your key stays in your browser and is not sent to our servers.
        </div>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div></div>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="p-0 w-full min-w-[220px] z-50 bg-card">
          {suggestions.map(s => (
            <button
              type="button"
              className="block w-full text-left px-4 py-2 hover:bg-cosmic-purple/10 cursor-pointer"
              key={s.id}
              onClick={() => handleSelect(s)}
            >
              {s.place_name}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PlaceAutocompleteInput;
