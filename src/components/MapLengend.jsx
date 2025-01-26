// src/components/MapLegend.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import weatherIcons from '../utils/weatherIcons';

const legendItems = [
  { label: 'Sunny', icon: weatherIcons.sunny },
  { label: 'Cloudy', icon: weatherIcons.cloudy },
  { label: 'Rainy', icon: weatherIcons.rainy },
  { label: 'Snowy', icon: weatherIcons.snowy },
  { label: 'Smog', icon: weatherIcons.smog },
  { label: 'Stormy', icon: weatherIcons.stormy },
];

const MapLegend = () => {
  return (
    <Box
      className="map-legend"
      sx={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 2,
        borderRadius: 2,
        color: '#fff',
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle1">Legend</Typography>
      {legendItems.map((item) => (
        <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Box sx={{ marginRight: 1 }}>{item.icon}</Box>
          <Typography variant="body2">{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MapLegend;
