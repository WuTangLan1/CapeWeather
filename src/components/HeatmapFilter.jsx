// src/components/HeatmapFilter.jsx
import React from 'react';
import { Box, Slider, Typography } from '@mui/material';

const HeatmapFilter = ({ temperatureRange, setTemperatureRange }) => {
  const handleChange = (event, newValue) => {
    setTemperatureRange(newValue);
  };

  return (
    <Box
      className="heatmap-filter"
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 2,
        borderRadius: 2,
        color: '#fff',
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle1">Temperature Range (°C)</Typography>
      <Slider
        value={temperatureRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={-10}
        max={40}
      />
    </Box>
  );
};

export default HeatmapFilter;
