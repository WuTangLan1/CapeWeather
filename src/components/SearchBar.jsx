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
      sx={{
        width: '100%',
        maxWidth: '600px', // Limits the maximum width to 600px
        marginX: 'auto',  // Centers the component horizontally
        paddingX: '16px', // Adds padding on the left and right
        paddingY: '16px', // Adds padding on the top and bottom
      }}
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
              <Place sx={{ color: '#00e5ff', marginRight: '8px' }} aria-label="Location Icon" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearch}
                aria-label="search"
                sx={{
                  background: 'linear-gradient(to right, #00e5ff, #00b3c5)',
                  color: '#fff',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease',
                  },
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: '50px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
          },
        }}
      />
    </Box>
  </motion.div>

  );
}
