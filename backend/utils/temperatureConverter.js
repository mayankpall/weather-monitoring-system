// utils/temperatureConverter.js

const convertTemperature = (kelvin, unit = 'C') => {
  if (unit === 'C') {
      return (kelvin - 273.15).toFixed(2);
  } else if (unit === 'F') {
      return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
  }
  return kelvin;
};

module.exports = { convertTemperature };
