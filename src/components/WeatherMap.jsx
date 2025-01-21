// src/components/WeatherMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default markers - Add null checks for SSR safety
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
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${
            import.meta.env.VITE_MAPBOX_TOKEN
          }`}
          attribution='© <a href="https://www.mapbox.com/">Mapbox</a>'
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