// src/components/WeatherMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import { useMap } from 'react-leaflet';

function MapBounds() {
  const map = useMap();

  const bounds = L.latLngBounds(
    L.latLng(-34.5, 18.2),  // SW point
    L.latLng(-33.8, 18.8)   // NE point
  );

  map.setMaxBounds(bounds);
  map.setMaxBoundsViscosity(1.0); // Disallow map panning outside bounding box
  map.setMinZoom(10);             // Zoom out just enough to see entire Cape Town area
  map.setMaxZoom(18);             // A typical max to see details

  return null;
}


if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

export default function WeatherMap({ locations }) {
  // Add null check for locations
  if (!locations || locations.length === 0) return null;

  return (
    <div style={{ height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer 
        center={[-33.9249, 18.4241]}
        zoom={11}  // Closer zoom level
        style={{ height: '100%', width: '100%' }}
        // Add key to force re-render when locations change
        key={locations.length}
      >
        <MapBounds />
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        
        {locations.map((loc, index) => {
          // Add validation for coordinates
          if (!loc.location?.lat || !loc.location?.lon) return null;
          
          return (
            <Marker
              key={`${loc.location.name}-${index}`} // Better key strategy
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
          );
        })}
      </MapContainer>
    </div>
  );
}