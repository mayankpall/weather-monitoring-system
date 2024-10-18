// frontend/src/components/Forecast.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Forecast from './Forecast';
import axios from 'axios';

jest.mock('axios'); // Mock Axios

describe('Forecast Component', () => {
  it('renders forecast data', async () => {
    const mockData = {
      city: { name: 'Delhi' },
      list: [
        {
          dt: 1697700000,
          main: { temp: 303.35, feels_like: 309.65 },
          weather: [{ main: 'Clear' }],
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: mockData }); // Mock response

    render(<Forecast city="Delhi" />);

    // Wait for the forecast data to be rendered
    await waitFor(() => expect(screen.getByText(/5-Day Forecast for Delhi/i)).toBeInTheDocument());
    expect(screen.getByText(/Temperature: 30.20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Condition: Clear/i)).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Mock error

    render(<Forecast city="InvalidCityName" />);

    await waitFor(() => expect(screen.getByText(/Failed to load forecast data/i)).toBeInTheDocument());
  });
});
