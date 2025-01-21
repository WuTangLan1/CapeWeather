import { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Search, Place } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';
import { motion } from 'framer-motion';

const placeholderVariants = [
  "Rondebosch",
  "Newlands",
  "Kommetjie",
  "Oranjezicht",
  "Sea Point"
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

  const handleSearch = () => {
    if (query.trim()) {
      const formattedQuery = `${query.trim()}, Cape Town`;
      dispatch(fetchWeather(formattedQuery));
      setQuery('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder={`Search e.g. ${placeholder}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Place sx={{ color: 'primary.main', mr: 1 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleSearch}
                sx={{
                  background: 'linear-gradient(45deg, #00e5ff 30%, #00b8d4 90%)',
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '50px',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.15)'
            },
            '&.Mui-focused': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
            }
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            paddingLeft: '16px',
            paddingRight: '8px'
          }
        }}
      />
    </motion.div>
  );
}