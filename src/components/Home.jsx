// src/pages/Home.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Box, Skeleton, Typography, Stack, Card, Button } from '@mui/material';
import { Place } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import { fetchWeather } from '../features/weatherSlice';

const defaultCities = [
  'Rondebosch',
  'Newlands',
  'Kommetjie',
  'Oranjezicht',
  'Sea Point',
  'Claremont',
  'Constantia',
  'Camps Bay',
  'Green Point',
  'Milnerton',
  'Muizenberg',
  'Durbanville',
  "Simon's Town",
  'Bellville',
  'Parklands',
  'Salt River',
  'Atlantis',
  'Brackenfell',
  'Gardens',
  'Observatory',
  'Vredehoek',
  'Tamboerskloof',
  'Kenilworth',
  'Mowbray',
  'Bergvliet',
  'Woodstock',
  'Goodwood',
  'Kloof Nek',
  'Belhar',
  'Fordsburg'
];

export default function Home() {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.weather);

  return (
    <Container maxWidth={false} className="w-full py-8 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <Box className="mb-8">
        <SearchBar />
      </Box>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Box className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
            <span className="text-xl">⚠️</span>
            <Typography variant="body1">{error}</Typography>
          </Box>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <Grid container spacing={6}>
        {/* Weather Map */}
        <Grid item xs={12} lg={8}>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Skeleton
                variant="rounded"
                height={500}
                className="bg-gray-700 rounded-2xl"
              />
            </motion.div>
          ) : (
            <WeatherMap locations={locations} />
          )}
        </Grid>

        {/* Weather Information or Default Cities */}
        <Grid item xs={12} lg={4}>
          {locations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
                <Typography variant="h5" className="font-bold mb-3 text-white">
                  🌆 Explore Cape Town
                </Typography>
                <Typography variant="body1" className="text-gray-300 mb-6">
                  Search for Cape Town suburbs or try these popular areas:
                </Typography>

                {/* Suburbs Grid */}
                <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {defaultCities.map((city) => (
                    <Button
                      key={city}
                      variant="outlined"
                      onClick={() => dispatch(fetchWeather(`${city}, Cape Town`))}
                      className="
                        justify-start
                        py-3
                        border border-white border-opacity-20
                        text-white
                        hover:border-primary-500
                        hover:bg-primary-500 hover:bg-opacity-20
                        transition-colors duration-200
                        rounded-lg
                        w-full
                      "
                    >
                      <Place className="text-primary-500 mr-3" />
                      {city}
                    </Button>
                  ))}
                </Box>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Stack spacing={6}>
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
