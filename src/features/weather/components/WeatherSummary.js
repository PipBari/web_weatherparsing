import React from 'react';
import { useSelector } from 'react-redux';

function WeatherSummary() {
    const weather = useSelector(state => state.weather.currentWeather);

    if (!weather) {
        return <div>Loading...</div>;
    }

    const temperature = Math.round(weather.main.temp);
    const feelsLike = Math.round(weather.main.feels_like);

    return (
        <div className="weather-summary">
            <h3>Сводка погоды для {weather.name}</h3>
            <p>Температура: {temperature} °C (ощущается как {feelsLike} °C)</p>
            <p>Влажность: {weather.main.humidity}%</p>
            <p>Давление: {weather.main.pressure} мм рт. ст.</p>
            <p>Ветер: {weather.wind.speed} м/с, направление {weather.wind.deg}°</p>
            <p>Облачность: {weather.clouds.all}%</p>
        </div>
    );
}

export default WeatherSummary;
