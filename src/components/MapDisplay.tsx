
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';

interface MapDisplayProps {
  coordinates?: { lat: number; lng: number };
  apiKey?: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ coordinates, apiKey }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    // Early return if no coordinates or API key
    if (!coordinates || !apiKey || !mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = apiKey;
    
    if (map.current) {
      // If map already exists, just update it
      map.current.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 10,
        essential: true
      });

      // Update marker position
      if (marker.current) {
        marker.current.setLngLat([coordinates.lng, coordinates.lat]);
      } else {
        // Create new marker if it doesn't exist
        marker.current = new mapboxgl.Marker({ color: '#9d4edd' })
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(map.current);
      }
    } else {
      // Create new map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [coordinates.lng, coordinates.lat],
        zoom: 10,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
          showCompass: true
        }),
        'top-right'
      );

      // Add marker when map loads
      map.current.on('load', () => {
        marker.current = new mapboxgl.Marker({ color: '#9d4edd' })
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(map.current!);
          
        // Add stars layer for cosmic effect
        if (map.current) {
          map.current.addLayer({
            id: 'stars',
            type: 'sky',
            paint: {
              'sky-type': 'atmosphere',
              'sky-atmosphere-color': 'rgba(141, 114, 225, 1)',
              'sky-atmosphere-halo-color': 'rgba(82, 45, 168, 1)',
              'sky-atmosphere-sun-intensity': 15
            }
          });
        }
      });
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [coordinates, apiKey]);

  if (!coordinates || !apiKey) {
    return null;
  }

  return (
    <Card className="mt-4 overflow-hidden cosmic-card">
      <CardContent className="p-0">
        <div ref={mapContainer} className="h-[300px] w-full" />
        <div className="p-2 text-xs text-cosmic-gold/70 text-center">
          Location: {coordinates.lat.toFixed(4)}°N, {coordinates.lng.toFixed(4)}°E
        </div>
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
