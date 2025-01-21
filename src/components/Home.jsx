// src/pages/Home.jsx
import { useSelector } from 'react-redux';
import { Grid, Container, Box, Skeleton, Typography, Stack } from '@mui/material';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherMap from '../components/WeatherMap';

export default function Home() {
  const { locations, loading, error } = useSelector(state => state.weather);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <SearchBar />
      </Box>

      {error && (
        <Typography color="error" textAlign="center">
          Error: {error}
        </Typography>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <Skeleton variant="rounded" height={500} />
          ) : (
            <WeatherMap locations={locations} />
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {locations.map((location, index) => (
              <WeatherCard key={index} data={location} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}