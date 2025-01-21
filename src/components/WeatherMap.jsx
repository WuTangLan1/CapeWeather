// src/components/WeatherMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function WeatherMap({ locations }) {
  return (
    <div style={{ height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer 
        center={[-28.4796, 24.6981]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
          attribution='© <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.location.lat, loc.location.lon]}
          >
            <Popup>
              <div>
                <h3>{loc.location.name}</h3>
                <p>{loc.current.temp_c}°C</p>
                <img 
                  src={`https:${loc.current.condition.icon}`} 
                  alt={loc.current.condition.text} 
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}