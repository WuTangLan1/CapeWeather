// src/components/WeatherMap.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCoords } from '../features/weather/weatherSlice.js';
import weatherIcons from '../utils/weatherIcons.jsx';
import createClusterIcon from '../utils/clusterIcons';
import MapLegend from './MapLengend.jsx'
import HeatmapFilter from './HeatmapFilter.jsx';
import MapSettings from './MapSettings.jsx';
import MiniChart from './MiniChart.jsx';
import { motion } from 'framer-motion';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import 'leaflet.heat';
import 'leaflet.markercluster';

// Geocoder Control Component
const GeocoderControl = ({ dispatch }) => {
  const map = useMap();

  useEffect(() => {
    const LControlGeocoder = require('leaflet-control-geocoder');

    const geocoder = LControlGeocoder.geocoder.nominatim();

    const control = LControlGeocoder.control({
      geocoder: geocoder,
      defaultMarkGeocode: false,
      showResultIcons: false,
    })
      .on('markgeocode', function (e) {
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
      map.removeControl(control);
    };
  }, [map, dispatch]);

  return null;
};

// Heatmap Layer Component
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

// Custom MarkerClusterGroup Component
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

// Main WeatherMap Component
const WeatherMap = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const { locations, loading, error } = useSelector(
    (state) => state.weather
  );

  const [temperatureRange, setTemperatureRange] = useState([-10, 40]);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  // Filter locations based on temperature range
  const filteredLocations = useMemo(() => {
    return locations.filter(
      (loc) =>
        loc.current.temp_c >= temperatureRange[0] &&
        loc.current.temp_c <= temperatureRange[1]
    );
  }, [locations, temperatureRange]);

  // Prepare heatmap data
  const heatData = useMemo(() => {
    return filteredLocations
      .filter((loc) => loc.location?.lat && loc.location?.lon)
      .map((loc) => [loc.location.lat, loc.location.lon, loc.current.temp_c]);
  }, [filteredLocations]);

  // Initialize custom marker icons if needed
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
      <HeatmapFilter
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
          center={[-33.9249, 18.4241]} // Cape Town Coordinates
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

          {/* Tile Layer based on Theme */}
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
