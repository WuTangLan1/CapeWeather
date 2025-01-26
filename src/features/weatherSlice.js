// src/features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchMultipleLocations } from '../../services/weatherAPI';

// Existing Thunks
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

// **New Thunk: fetchWeatherByCoords**
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

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    locations: [],
    current: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Handle fetchWeather**
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if (action.payload.location.region.toLowerCase().includes('western cape')) {
          state.locations = [...state.locations, action.payload];
        }
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // **Handle fetchBulkWeather**
      .addCase(fetchBulkWeather.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      
      // **Handle fetchWeatherByCoords**
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        if (action.payload.location.region.toLowerCase().includes('western cape')) {
          state.locations = [...state.locations, action.payload];
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

export default weatherSlice.reducer;

// **Export Thunks (Optional but Recommended)**
export { fetchWeather, fetchBulkWeather };
