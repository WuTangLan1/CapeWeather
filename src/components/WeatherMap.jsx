// src/components/WeatherMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Create a separate component for bounds control
function MapBoundsController() {
  const map = useMap();

  useEffect(() => {
    if (map) {
      const bounds = L.latLngBounds(
        L.latLng(-34.5, 18.2),  // SW point
        L.latLng(-33.8, 18.8)   // NE point
      );

      // Check if method exists before calling
      if (typeof map.setMaxBoundsViscosity === 'function') {
        map.setMaxBoundsViscosity(1.0);
      }
      
      map.setMaxBounds(bounds);
      map.setMinZoom(10);
      map.setMaxZoom(18);
    }
  }, [map]);

  return null;
}

// Marker icon configuration
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

export default function WeatherMap({ locations }) {
  if (!locations || locations.length === 0) return null;

  return (
    <div style={{ height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer 
        center={[-33.9249, 18.4241]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          // Initialize bounds after map creation
          setTimeout(() => {
            map.invalidateSize();
          }, 0);
        }}
      >
        <MapBoundsController />
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {locations.map((loc) => (
          loc.location?.lat && loc.location?.lon && (
            <Marker
              key={`${loc.location.name}-${loc.location.lat}`}
              position={[loc.location.lat, loc.location.lon]}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ margin: '0.5rem 0' }}>{loc.location.name}</h3>
                  <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
                    {loc.current.temp_c}°C
                  </p>
                  {loc.current.condition.icon && (
                    <img 
                      src={`https:${loc.current.condition.icon}`} 
                      alt={loc.current.condition.text}
                      style={{ width: '50px', height: '50px' }} 
                    />
                  )}
                  <p style={{ margin: '0.5rem 0' }}>
                    {loc.current.condition.text}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}