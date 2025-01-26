// src/components/MapSettings.jsx
import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';

const MapSettings = ({
  showHeatmap,
  setShowHeatmap,
  showLegend,
  setShowLegend,
}) => {
  return (
    <Box
      className="map-settings"
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 2,
        borderRadius: 2,
        color: '#fff',
        zIndex: 1000,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={showHeatmap}
            onChange={(e) => setShowHeatmap(e.target.checked)}
            color="primary"
          />
        }
        label="Heatmap"
      />
      <FormControlLabel
        control={
          <Switch
            checked={showLegend}
            onChange={(e) => setShowLegend(e.target.checked)}
            color="primary"
          />
        }
        label="Legend"
      />
    </Box>
  );
};

export default MapSettings;
