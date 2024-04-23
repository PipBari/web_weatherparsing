import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: {},
  status: 'idle',
  error: null
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81592fd082211aafdeee651e9fc04176&units=metric&lang=ru`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      resetError(state) {
        state.error = null;
        state.data = {}; 
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchWeather.pending, (state) => {
          state.status = 'loading';
          state.error = null;
          state.data = {};
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchWeather.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload.message || "Ошибка запроса";
          state.data = {}; 
        });
    }
  });  

export const { resetError } = weatherSlice.actions;

export default weatherSlice.reducer;
