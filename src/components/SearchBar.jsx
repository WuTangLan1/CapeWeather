// src/components/SearchBar.jsx
import { useState, useEffect, useCallback } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Search, Place } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce'; 

const placeholderVariants = [
  "Rondebosch",
  "Newlands",
  "Kommetjie",
  "Oranjezicht",
  "Sea Point",
  "Claremont",
  "Constantia",
  "Camps Bay",
  "Green Point",
  "Milnerton",
  "Muizenberg",
  "Durbanville",
  "Simon's Town",
  "Bellville",
  "Parklands",
  "Salt River",
  "Atlantis",
  "Brackenfell",
  "Gardens",
  "Observatory",
  "Vredehoek",
  "Tamboerskloof",
  "Kenilworth",
  "Mowbray",
  "Bergvliet",
  "Woodstock",
  "Goodwood",
  "Kloof Nek",
  "Belhar",
  "Fordsburg"
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let current = 0;
    const next = () => {
      setPlaceholder(placeholderVariants[current]);
      current = (current + 1) % placeholderVariants.length;
    };
    next();
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  // Debounced search function to prevent excessive dispatches
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim()) {
        const formattedQuery = `${searchQuery.trim()}, Cape Town`;
        dispatch(fetchWeather(formattedQuery));
        setQuery('');
      }
    }, 500), // Adjust delay as needed
    [dispatch]
  );

  const handleSearch = () => {
    debouncedSearch(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        className="w-full sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-4/5 mx-auto px-4 mb-4"
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Search e.g. ${placeholder}...`}
          value={query}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Place className="text-primary-500 mr-2" aria-label="Location Icon" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleSearch}
                  aria-label="search"
                  className="bg-gradient-to-r from-blue-400 to-teal-400 text-white hover:scale-105 transition-transform duration-200"
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
            className: `
              rounded-full bg-white bg-opacity-10 backdrop-blur-lg text-lg
              hover:bg-white bg-opacity-15
              focus:bg-white bg-opacity-20 focus:shadow-lg
              transition-all duration-300 ease-in-out
            `
          }}
          className="!rounded-full" // Override MUI's border-radius if necessary
        />
      </Box>
    </motion.div>
  );
}
