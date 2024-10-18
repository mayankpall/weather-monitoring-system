// frontend/src/components/HumidityChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HumidityChart = ({ summaries }) => {
    if (!summaries || summaries.length === 0) return <p>No data available for chart.</p>;

    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const dates = [...new Set(summaries.map(s => s.date))].sort();

    const datasets = cities.map((city, idx) => {
        const cityData = dates.map(date => {
            const summary = summaries.find(s => s.city === city && s.date === date);
            return summary ? summary.averageHumidity : null;
        });

        const colors = ['blue', 'green', 'orange', 'purple', 'cyan', 'magenta'];

        return {
            label: city,
            data: cityData,
            borderColor: colors[idx],
            backgroundColor: colors[idx],
            fill: false
        };
    });

    const data = {
        labels: dates,
        datasets: datasets
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Average Humidity Trends'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Humidity (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        }
    };

    return (
        <div>
            <h2>Humidity Trends</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default HumidityChart;
