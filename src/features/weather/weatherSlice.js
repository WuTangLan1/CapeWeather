// src/features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchMultipleLocations } from '../../services/weatherAPI';

export const fetchWeather = createAsyncThunk(
  'weather/fetch',
  async (location, { rejectWithValue }) => {
    try {
      return await fetchCurrentWeather(location);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBulkWeather = createAsyncThunk(
  'weather/fetchBulk',
  async (locations, { rejectWithValue }) => {
    try {
      const responses = await fetchMultipleLocations(locations);
      return responses.map(res => res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const location = `${lat},${lon}`;
      return await fetchCurrentWeather(location);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper function to check for existing location
const isLocationExists = (locations, newLocation) => {
  return locations.some(
    loc => loc.location.name.toLowerCase() === newLocation.location.name.toLowerCase()
  );
};

// Slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    locations: [],
    current: null,
    loading: false,
    error: null
  },
  reducers: {
    removeLocation: (state, action) => {
      state.locations = state.locations.filter(
        loc => loc.location.name.toLowerCase() !== action.payload.toLowerCase()
      );
    },
    clearLocations: (state) => {
      state.locations = [];
      state.current = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const existingIndex = state.locations.findIndex(
          (loc) =>
            loc.location.name.toLowerCase() === action.payload.location.name.toLowerCase()
        );
    
        if (existingIndex > -1) {
          state.locations[existingIndex] = action.payload;
        } else {
          state.locations = [...state.locations, action.payload];
        }
    
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBulkWeather.fulfilled, (state, action) => {
        const uniqueLocations = action.payload.filter(
          newLoc => !isLocationExists(state.locations, newLoc)
        );
        state.locations = [...state.locations, ...uniqueLocations];
      })
      
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        if (action.payload.location.region.toLowerCase().includes('western cape')) {
          if (!isLocationExists(state.locations, action.payload)) {
            state.locations = [...state.locations, action.payload];
          }
        }
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export Reducer and Actions
export default weatherSlice.reducer;
export const { removeLocation, clearLocations } = weatherSlice.actions;
