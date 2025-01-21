// src/components/SearchBar.jsx
import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchWeather(query));
      setQuery('');
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search South African suburb..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          borderRadius: '50px',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }
      }}
    />
  );
}