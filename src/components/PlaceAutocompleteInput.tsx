
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin } from "lucide-react";

interface PlaceAutocompleteInputProps {
  value: string;
  onChange: (val: string) => void;
}

// Public Mapbox API key for demo purposes. For production, set your own!
const DEMO_MAPBOX_KEY = "pk.eyJ1IjoibG92YWJsZWlsbCIsImEiOiJjanZwdmI1d20wNGZhM3pubnBrZ2drM2xlIn0.ClfC0cuGZ4SKyA9T6ZlPeA";

const PlaceAutocompleteInput: React.FC<PlaceAutocompleteInputProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiKey, setApiKey] = useState<string>(DEMO_MAPBOX_KEY);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const resp = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${apiKey}&autocomplete=true&types=place,locality,region,country`
        );
        const data = await resp.json();
        setSuggestions(data.features || []);
        setIsOpen((data.features || []).length > 0);
      } catch (e) {
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
    onChange(place.place_name);
    setQuery(place.place_name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="mb-2 flex gap-2">
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
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-cosmic-gold pointer-events-none"><MapPin size={20} /></span>
      </div>

      {/* Allow user to set custom Mapbox API Key (optional) */}
      <div className="mb-2">
        <Input
          placeholder="Mapbox API Key (optional)"
          value={apiKey !== DEMO_MAPBOX_KEY ? apiKey : ''}
          onChange={e => setApiKey(e.target.value || DEMO_MAPBOX_KEY)}
          className="cosmic-input"
          type="password"
        />
        <div className="text-xs text-muted-foreground mt-1">
          You can enter your <a href="https://account.mapbox.com/access-tokens/" rel="noopener noreferrer" target="_blank" className="underline">Mapbox API key</a> for more accurate results.
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
