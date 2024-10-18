// frontend/src/components/Alerts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/weather/alerts');
            setAlerts(res.data);
        } catch (error) {
            console.error('Error fetching alerts:', error.message);
        }
    };

    return (
        <div>
            <h1>Weather Alerts</h1>
            {alerts.length === 0 ? (
                <p>No alerts triggered.</p>
            ) : (
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>
                            <strong>{alert.condition} in {alert.city}</strong>
                            <p>{alert.message}</p>
                            <p>Triggered At: {new Date(alert.triggeredAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alerts;
