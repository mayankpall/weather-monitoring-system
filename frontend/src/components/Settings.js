// frontend/src/components/Settings.js
import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
    const [temperatureMax, setTemperatureMax] = useState(35);
    const [temperatureMin, setTemperatureMin] = useState(-5);
    const [conditions, setConditions] = useState(['Rain', 'Snow']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/weather/thresholds', {
                temperature: {
                    max: temperatureMax,
                    min: temperatureMin
                },
                conditions
            });
            alert(res.data.message);
        } catch (error) {
            console.error('Error updating thresholds:', error.message);
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Max Temperature (°C): </label>
                    <input
                        type="number"
                        value={temperatureMax}
                        onChange={(e) => setTemperatureMax(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Min Temperature (°C): </label>
                    <input
                        type="number"
                        value={temperatureMin}
                        onChange={(e) => setTemperatureMin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Weather Conditions for Alerts: </label>
                    <input
                        type="text"
                        value={conditions.join(', ')}
                        onChange={(e) => setConditions(e.target.value.split(',').map(cond => cond.trim()))}
                        required
                    />
                </div>
                <button type="submit">Update Thresholds</button>
            </form>
        </div>
    );
};

export default Settings;
