// src/pages/Home.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Box, Skeleton, Typography, Stack, Card, Button } from '@mui/material';
import { Place } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import { fetchWeather } from '../features/weatherSlice'; // Ensure to import dispatch

const defaultCities = [
  'Rondebosch',
  'Newlands',
  'Kommetjie',
  'Oranjezicht',
  'Sea Point',
  'Claremont',
  'Constantia',
  'Camps Bay',
];

export default function Home() {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.weather);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <SearchBar />
      </Box>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              p: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body1">⚠️ {error}</Typography>
          </Box>
        </motion.div>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Skeleton
                variant="rounded"
                height={500}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                }}
              />
            </motion.div>
          ) : (
            <WeatherMap locations={locations} />
          )}
        </Grid>

        <Grid item xs={12} lg={4}>
          {locations.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Card
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  borderRadius: '16px',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  🌆 Explore Cape Town
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Search for Cape Town suburbs or try these popular areas:
                </Typography>

                <Stack spacing={2}>
                  {defaultCities.map((city) => (
                    <Button
                      key={city}
                      variant="outlined"
                      fullWidth
                      onClick={() => dispatch(fetchWeather(`${city}, Cape Town`))} // Added onClick
                      sx={{
                        justifyContent: 'flex-start',
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'rgba(0, 229, 255, 0.05)',
                        },
                      }}
                    >
                      <Place sx={{ color: 'primary.main', mr: 1.5 }} />
                      {city}
                    </Button>
                  ))}
                </Stack>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Stack spacing={3}>
                {locations.map((location, index) => (
                  <WeatherCard key={index} data={location} />
                ))}
              </Stack>
            </motion.div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
