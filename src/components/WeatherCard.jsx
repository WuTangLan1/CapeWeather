// src/components/WeatherCard.jsx
import { Card, Typography, Stack, useTheme } from '@mui/material';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { motion } from 'framer-motion';

export default function WeatherCard({ data }) {
  const theme = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{
        p: 3,
        backdropFilter: 'blur(16px)',
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px'
      }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">
            {data.location.name}, {data.location.region}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={2}>
            <img 
              src={`https:${data.current.condition.icon}`} 
              alt={data.current.condition.text} 
              style={{ width: 64, height: 64 }}
            />
            <Typography variant="h3">
              {data.current.temp_c}°C
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <WiThermometer size={24} color={theme.palette.primary.main} />
              <Typography>Feels like {data.current.feelslike_c}°C</Typography>
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <WiHumidity size={24} color={theme.palette.primary.main} />
              <Typography>{data.current.humidity}% Humidity</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <WiStrongWind size={24} color={theme.palette.primary.main} />
              <Typography>{data.current.wind_kph} km/h Wind</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </motion.div>
  );
}