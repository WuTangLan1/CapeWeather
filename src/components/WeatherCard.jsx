// src/components/WeatherCard.jsx
import { Card, Typography, Stack, useTheme, Box, Chip } from '@mui/material';
import { WiThermometer, WiHumidity, WiStrongWind, WiRaindrop } from 'react-icons/wi';
import { motion } from 'framer-motion';

export default function WeatherCard({ data }) {
  const theme = useTheme();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        sx={{
          p: 3,
          backdropFilter: 'blur(16px)',
          bgcolor: 'background.paper',
          borderRadius: '16px',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">
            {data.location.name}, {data.location.region}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              component="img"
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
              sx={{ width: 64, height: 64 }}
            />
            <Typography variant="h3">{data.current.temp_c}°C</Typography>
          </Stack>

          <Typography variant="subtitle1" color="text.secondary">
            {data.current.condition.text}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Chip
              icon={<WiThermometer size={20} color={theme.palette.primary.main} />}
              label={`Feels like ${data.current.feelslike_c}°C`}
              variant="outlined"
              sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
            />
            <Chip
              icon={<WiHumidity size={20} color={theme.palette.primary.main} />}
              label={`${data.current.humidity}% Humidity`}
              variant="outlined"
              sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
            />
            <Chip
              icon={<WiStrongWind size={20} color={theme.palette.primary.main} />}
              label={`${data.current.wind_kph} km/h Wind`}
              variant="outlined"
              sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
            />
            {data.current.precip_mm > 0 && (
              <Chip
                icon={<WiRaindrop size={20} color={theme.palette.primary.main} />}
                label={`${data.current.precip_mm} mm Rain`}
                variant="outlined"
                sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
              />
            )}
          </Stack>
        </Stack>
      </Card>
    </motion.div>
  );
}
