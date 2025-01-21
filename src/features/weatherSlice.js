// src/features/weather/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchMultipleLocations } from '../services/weatherAPI';

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
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.locations = [...state.locations, action.payload];
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBulkWeather.fulfilled, (state, action) => {
        state.locations = action.payload;
      });
  }
});

export default weatherSlice.reducer;