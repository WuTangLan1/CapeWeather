// src\components\Home.jsx

import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { Place } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherMap from '../components/WeatherMap';
import WeatherCard from '../components/WeatherCard';
import { fetchWeather } from '../features/weatherSlice';

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
    <Box
          className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 md:px-12 lg:px-16 py-12"
          sx={{
            maxWidth: '1200px', 
            marginX: 'auto', 
          }}
        >
      {/* Search Bar */}
      <Box className="max-w-5xl mx-auto mb-12">
        <SearchBar />
      </Box>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 max-w-5xl mx-auto"
        >
          <Box className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
            <span className="text-xl">⚠️</span>
            <Typography variant="body1">{error}</Typography>
          </Box>
        </motion.div>
      )}

      {/* Main Content */}
      <Box className="max-w-7xl mx-auto">
        {/* Weather Map */}
        <Box className="mb-10">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Skeleton
                variant="rounded"
                height={400}
                className="bg-gray-700 rounded-xl"
              />
            </motion.div>
          ) : (
            <WeatherMap locations={locations} />
          )}
        </Box>

        {/* Default Cities or Weather Info */}
        <Box>
          {locations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Box className="bg-gray-800 bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-md">
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-white text-center"
                >
                  🌆 Explore Cape Town
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-400 mb-8 text-center"
                >
                  Search for Cape Town suburbs or try these popular areas:
                </Typography>
                <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                  {allDefaultCities.map((city) => (
                    <Button
                      key={city}
                      variant="outlined"
                      onClick={() => dispatch(fetchWeather(`${city}, Cape Town`))}
                      className="
                        flex
                        items-center
                        justify-start
                        border border-white border-opacity-30
                        text-white
                        hover:border-primary-500
                        hover:bg-primary-500 hover:bg-opacity-20
                        transition duration-200
                        rounded-lg
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
              <Box className="space-y-6">
                {locations.map((location, index) => (
                  <WeatherCard key={index} data={location} />
                ))}
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>
    </Box>
  );
}
