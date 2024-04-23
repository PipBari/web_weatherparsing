import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather as fetchWeatherRx } from '../../services/weatherService';

const initialState = {
  currentWeather: null,
  data: [],
  status: 'idle',
  error: null
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city, { rejectWithValue }) => {
  try {
    const data = await fetchWeatherRx(city).toPromise();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
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
        state.currentWeather = null; 
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload; 
        state.data.unshift(action.payload); 
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.currentWeather = null;
      });
  }  
});

export const { resetError, clearHistory } = weatherSlice.actions;

export default weatherSlice.reducer;
