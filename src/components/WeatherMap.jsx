// src/components/WeatherMap.jsx

import React, { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

// 1) Import Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Make Leaflet global so older plugins see `L`
window.L = L;

// 2) Side-effect imports for older plugins:
import 'leaflet.heat'; // modifies window.L with L.heatLayer
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster'; // modifies window.L with L.markerClusterGroup
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder'; // modifies window.L with L.Control.Geocoder

// 3) React/Redux code
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCoords } from '../features/weather/weatherSlice.js';
import weatherIcons from '../utils/weatherIcons.jsx';
import createClusterIcon from '../utils/clusterIcons.js';
import MapLegend from './MapLegend.jsx';
import HeatMapFilter from './HeatMapFilter.jsx';
import MapSettings from './MapSettings.jsx';
import MiniChart from './MiniChart.jsx';
import { motion } from 'framer-motion';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const GeocoderControl = ({ dispatch }) => {
  const map = useMap();

  useEffect(() => {
    // 4) The plugin defines L.Control.Geocoder.nominatim() and L.Control.geocoder(...)
    if (!L.Control.Geocoder) {
      console.error('leaflet-control-geocoder plugin did not load properly!');
      return;
    }

    const geocoder = L.Control.Geocoder.nominatim();

    const geocoderControl = L.Control.geocoder({
      geocoder,
      defaultMarkGeocode: false,
      showResultIcons: false,
    })
      .on('markgeocode', (e) => {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest(),
        ]);
        map.fitBounds(poly.getBounds());

        const { lat, lng } = e.geocode.center;
        dispatch(fetchWeatherByCoords({ lat, lon: lng }));
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoderControl);
    };
  }, [map, dispatch]);

  return null;
};


const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
};


const MarkerClusterGroupComponent = ({ children }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: createClusterIcon,
    });

    children.forEach((child) => {
      const { position, children: popupContent } = child.props;
      const marker = L.marker(position);
      if (popupContent) {
        marker.bindPopup(popupContent);
      }
      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, children]);

  return null;
};


const WeatherMap = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const { locations, loading, error } = useSelector((state) => state.weather);

  const [temperatureRange, setTemperatureRange] = useState([-10, 40]);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  // Filter the locations
  const filteredLocations = useMemo(() => {
    return locations.filter(
      (loc) =>
        loc.current.temp_c >= temperatureRange[0] &&
        loc.current.temp_c <= temperatureRange[1]
    );
  }, [locations, temperatureRange]);

  // Prepare heat data
  const heatData = useMemo(() => {
    return filteredLocations
      .filter((loc) => loc.location?.lat && loc.location?.lon)
      .map((loc) => [loc.location.lat, loc.location.lon, loc.current.temp_c]);
  }, [filteredLocations]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Settings Panel */}
      <MapSettings
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showLegend={showLegend}
        setShowLegend={setShowLegend}
      />

      {/* Temperature Filter */}
      <HeatMapFilter
        temperatureRange={temperatureRange}
        setTemperatureRange={setTemperatureRange}
      />

      {/* Animated Map Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ height: '100%', width: '100%' }}
      >
        <MapContainer
          center={[-33.9249, 18.4241]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => {
            setTimeout(() => {
              mapInstance.invalidateSize();
            }, 0);
          }}
        >
          {/* Geocoder Control */}
          <GeocoderControl dispatch={dispatch} />

          {/* Tile Layer */}
          <TileLayer
            url={
              isDarkMode
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Marker Clustering */}
          <MarkerClusterGroupComponent>
            {filteredLocations.map((loc, index) => (
              loc.location?.lat &&
              loc.location?.lon && (
                <Marker
                  key={`${loc.location.name}-${index}`}
                  position={[loc.location.lat, loc.location.lon]}
                >
                  <Popup>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        className="popup-content"
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                          padding: 2,
                          borderRadius: 2,
                          textAlign: 'center',
                          width: '200px',
                        }}
                      >
                        <Typography variant="h6">
                          {loc.location.name}
                        </Typography>
                        <Box sx={{ my: 1 }}>
                          {weatherIcons[
                            loc.current.condition.text.toLowerCase()
                          ] || weatherIcons.sunny}
                        </Box>
                        <Typography variant="h5">
                          {loc.current.temp_c}°C
                        </Typography>
                        <Typography variant="body1">
                          {loc.current.condition.text}
                        </Typography>
                        <Typography variant="body2">
                          Humidity: {loc.current.humidity}%
                        </Typography>
                        <Typography variant="body2">
                          Wind: {loc.current.wind_kph} kph
                        </Typography>
                        {/* Mini Chart */}
                        {loc.forecast && loc.forecast.length > 0 && (
                          <MiniChart data={loc.forecast} />
                        )}
                      </Box>
                    </motion.div>
                  </Popup>
                </Marker>
              )
            ))}
          </MarkerClusterGroupComponent>

          {/* Heatmap Layer */}
          {showHeatmap && <HeatmapLayer points={heatData} />}
        </MapContainer>
      </motion.div>

      {/* Map Legend */}
      {showLegend && <MapLegend />}

      {/* Loading Indicator */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Error Handling */}
      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            color: '#fff',
            padding: 2,
            borderRadius: 2,
            zIndex: 1000,
          }}
        >
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeatherMap;
