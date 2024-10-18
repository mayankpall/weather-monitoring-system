// frontend/src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="weather-card">
            <h3>{weather.city}</h3>
            <p>Condition: {weather.main}</p>
            <p>Temperature: {weather.temp}°C</p>
            <p>Feels Like: {weather.feels_like}°C</p>
            <p>Last Updated: {new Date(weather.dt * 1000).toLocaleString()}</p>
        </div>
    );
};

export default WeatherCard;
