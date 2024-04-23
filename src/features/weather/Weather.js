import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, resetError } from './weatherSlice';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherHistory from './components/WeatherHistory';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

function Weather() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather.currentWeather);
  const status = useSelector(state => state.weather.status);
  const error = useSelector(state => state.weather.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetError());
    dispatch(fetchWeather(city));
  };

  return (
    <div>
      <h2>Мониторинг погоды</h2>
      <SearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} />
      {status === 'loading' && <Loading />}
      {error && <ErrorMessage error={error} />}
      {weather && <WeatherDisplay weather={weather} />}
      <WeatherHistory />
    </div>
  );
}

export default Weather;
