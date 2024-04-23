import React from 'react';
import { useSelector } from 'react-redux';

function WeatherHistory() {
  const weatherHistory = useSelector(state => state.weather.data);

  return (
    <div>
      <h3>История погоды</h3>
      <ul>
        {weatherHistory.map((entry, index) => (
          <li key={index}>
            <strong>{entry.name}</strong> - {Math.round(entry.main.temp)}°C, {entry.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherHistory;
