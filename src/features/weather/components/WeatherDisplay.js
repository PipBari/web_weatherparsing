import React from 'react';

function WeatherDisplay({ weather }) {
  const roundedTemp = Math.round(weather.main.temp);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{weather.name}</h5>
        <p className="card-text">Температура: {roundedTemp} °C</p>
        <p className="card-text">Погода: {weather.weather[0].description}</p>
      </div>
    </div>
  );
}

export default WeatherDisplay;
