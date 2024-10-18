const { convertTemperature } = require('../utils/temperatureConverter');

describe('Temperature Conversion', () => {
    test('converts temperature from Kelvin to Celsius', () => {
        const kelvin = 300;
        const celsius = convertTemperature(kelvin, 'C');
        expect(celsius).toBe('26.85'); // Should convert to 26.85°C
    });

    test('converts temperature from Kelvin to Fahrenheit', () => {
        const kelvin = 300;
        const fahrenheit = convertTemperature(kelvin, 'F');
        expect(fahrenheit).toBe('80.33'); // Should convert to 80.33°F
    });
});
