const axios = require('axios');
// jest.mock('axios');

describe('System Setup - API Key Verification', () => {
  test('successfully connects to OpenWeatherMap API with valid API key', async () => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = 'Mumbai';

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    expect(response.status).toBe(200); // Check if the API call is successful
    expect(response.data).toHaveProperty('main.temp'); // Ensure temperature is returned
  });

  test('fails to connect with an invalid API key', async () => {
    const invalidApiKey = 'invalidapikey';
    const city = 'Mumbai';

    try {
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${invalidApiKey}&units=metric`
      );
    } catch (error) {
      expect(error.response.status).toBe(401); // Unauthorized error
    }
  });
});
