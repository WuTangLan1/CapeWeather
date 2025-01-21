// src/services/weatherAPI.js
import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchCurrentWeather = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'API Error');
  }
};

export const fetchMultipleLocations = async (locations) => {
  const requests = locations.map(location => 
    axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`)
  );
  return Promise.all(requests);
};