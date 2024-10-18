import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import WindSpeedChart from './WindSpeedChart'; // Import the new WindSpeedChart
import Forecast from './Forecast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Dashboard.css';

const Dashboard = () => {
    const [latestWeather, setLatestWeather] = useState([]);
    const [summaries, setSummaries] = useState([]);
    const [selectedCity, setSelectedCity] = useState('None');
    const [loadingSummaries, setLoadingSummaries] = useState(true);
    const [errorSummaries, setErrorSummaries] = useState(null);

    useEffect(() => {
        fetchLatestWeather();
        fetchSummaries();
    }, []);

    const fetchLatestWeather = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/weather/latest`);
            setLatestWeather(res.data);
        } catch (error) {
            console.error('Error fetching latest weather:', error.message);
        }
    };

    const fetchSummaries = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/weather/summaries`);
            setSummaries(res.data);
            setLoadingSummaries(false);
        } catch (error) {
            console.error('Error fetching summaries:', error.message);
            setErrorSummaries('Failed to load summaries.');
            setLoadingSummaries(false);
        }
    };

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <div className="weather-cards">
                {latestWeather.map((weather, index) => (
                    <WeatherCard key={index} weather={weather} className="weather-card" />
                ))}
            </div>
            {loadingSummaries ? (
                <Skeleton count={3} height={200} style={{ marginBottom: '20px' }} />
            ) : errorSummaries ? (
                <p className="error-message">{errorSummaries}</p>
            ) : (
                <>
                    <TemperatureChart summaries={summaries} />
                    <HumidityChart summaries={summaries} />
                    <WindSpeedChart summaries={summaries} /> {/* Add WindSpeedChart */}
                </>
            )}
            <div>
                <h2>Select City for Forecast</h2>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="None">None</option> {/* Add None option */}
                    {latestWeather.map((weather, index) => (
                        <option key={index} value={weather.city}>{weather.city}</option>
                    ))}
                </select>
                {selectedCity !== 'None' && <Forecast city={selectedCity} />} {/* Conditionally render the forecast */}
            </div>
        </div>
    );
};

export default Dashboard;
