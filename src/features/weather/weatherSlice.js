import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city, { getState, rejectWithValue }) => {
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
    },
    clearHistory(state) {
      state.data = []; 
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.unshift(action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  }
});

export const { resetError, clearHistory } = weatherSlice.actions;

export default weatherSlice.reducer;
