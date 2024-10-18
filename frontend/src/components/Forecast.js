// frontend/src/components/Forecast.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Forecast.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Forecast = ({ city }) => {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/weather/forecast/${city}`);
                setForecast(res.data);
                setError(null); // Reset error on successful fetch
            } catch (error) {
                console.error('Error fetching forecast:', error.message);
                setError('Failed to load forecast data. Please try again later.');
            }
        };

        fetchForecast();
    }, [city]); // Re-run the effect only when 'city' changes

    if (error) return <p className="error-message">{error}</p>;
    if (!forecast) return (
        <div className="forecast-container">
            <h2>Loading Forecast...</h2>
            <Skeleton count={5} height={80} style={{ marginBottom: '10px' }} />
        </div>
    );

    return (
        <div className="forecast-container">
            <h2>5-Day Forecast for {forecast.city.name}</h2>
            <ul>
                {forecast.list.map((item) => (
                    <li key={item.dt} className="forecast-item">
                        <p>
                        <strong>Date & Time:</strong> {new Date(item.dt * 1000).toLocaleString()} &nbsp;&nbsp;
                        <strong>Temperature:</strong> {(item.main.temp - 273.15).toFixed(2)}°C &nbsp;&nbsp;
                        <strong>Condition:</strong> {item.weather[0].main}
                    </p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Forecast;
