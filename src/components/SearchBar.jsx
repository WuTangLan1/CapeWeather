// src/components/SearchBar.jsx
import { useState, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { Search, Place } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce'; 
import { suburbsList } from '../utils/suburbs';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery) {
        const formattedQuery = `${searchQuery.trim()}, Cape Town`;
        dispatch(fetchWeather(formattedQuery));
        setInputValue('');
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (event, value) => {
    if (value) {
      debouncedSearch(value);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
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
          maxWidth: '600px',
          marginX: 'auto',  
          paddingX: '16px',
          paddingY: '16px', 
        }}
      >
        <Autocomplete
          freeSolo={false} 
          options={suburbsList}
          value={inputValue}
          onChange={handleSearch}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder={`Search e.g. ${suburbsList[0]}...`} // Use the first suburb as a placeholder
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Place sx={{ color: '#00e5ff', marginRight: '8px' }} aria-label="Location Icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => debouncedSearch(inputValue)}
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
                  </>
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
          )}
        />
      </Box>
    </motion.div>
  );
}
