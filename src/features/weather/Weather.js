import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetError } from './weatherSlice';
import { fetchWeather, weatherSearchResults$ } from '../../services/weatherService';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherHistory from './components/WeatherHistory';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import WeatherSummary from './components/WeatherSummary'; 

function Weather() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather.currentWeather);
  const status = useSelector(state => state.weather.status);
  const error = useSelector(state => state.weather.error);

  useEffect(() => {
    const subscription = weatherSearchResults$.subscribe({
      next: (data) => {
        if (data.error) {
          dispatch({ type: 'weather/fetchWeather/rejected', payload: data.message });
        } else {
          dispatch({ type: 'weather/fetchWeather/fulfilled', payload: data });
        }
      },
      error: (err) => {
        dispatch({ type: 'weather/fetchWeather/rejected', payload: err.message });
      }
    });

    return () => subscription.unsubscribe(); 
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetError());
    fetchWeather(city); 
  };

  return (
    <div>
      <h2>Мониторинг погоды</h2>
      <SearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} />
      {status === 'loading' && <Loading />}
      {error && <ErrorMessage error={error} />}
      {weather && (
        <>
          <WeatherDisplay weather={weather} />
          <WeatherSummary />
        </>
      )}
      <WeatherHistory />
    </div>
  );
}

export default Weather;
