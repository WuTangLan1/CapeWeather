import { useSelector, useDispatch } from 'react-redux';
import { Box, Skeleton, Typography, Button } from '@mui/material';
import { Place } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';
import { fetchWeather } from '../features/weatherSlice';

// Default list of suburbs
const allDefaultCities = [
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
];

export default function Home() {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.weather);

  return (
    <Box className="min-h-screen w-full bg-gray-900 text-white">
      {/* Page Container with Padding */}
      <Box className="px-6 sm:px-12 lg:px-20 py-8 space-y-8">
        {/* Search Bar */}
        <Box className="max-w-5xl mx-auto">
          <SearchBar />
        </Box>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <Box className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
              <span className="text-xl">⚠️</span>
              <Typography variant="body1">{error}</Typography>
            </Box>
          </motion.div>
        )}

        <Box className="max-w-7xl mx-auto space-y-8">
          {/* Weather Map or Skeleton */}
          <Box>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Skeleton
                  variant="rounded"
                  height={400}
                  className="bg-gray-700 rounded-2xl"
                />
              </motion.div>
            ) : (
              <WeatherMap locations={locations} />
            )}
          </Box>

          {/* Weather Info or Default Cities */}
          <Box>
            {locations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Box className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
                  <Typography variant="h5" className="font-bold mb-4 text-white">
                    🌆 Explore Cape Town
                  </Typography>
                  <Typography variant="body1" className="text-gray-300 mb-6">
                    Search for Cape Town suburbs or try these popular areas:
                  </Typography>

                  {/* Suburbs Grid */}
                  <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {allDefaultCities.map((city) => (
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
                </Box>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box className="space-y-4">
                  {locations.map((location, index) => (
                    <WeatherCard key={index} data={location} />
                  ))}
                </Box>
              </motion.div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
