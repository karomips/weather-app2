const axios = require('axios');

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'http://api.weatherapi.com/v1/forecast.json';
    this.cache = {};
  }

  async searchWeatherByLocation(city) {
    if (!this.cache[city]) {
      try {
        const response = await axios.get(this.apiUrl, {
          params: {
            key: this.apiKey,
            q: city
          }
        });
        this.cache[city] = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    }
    return this.cache[city];
  }

  clearCache(city) {
    delete this.cache[city];
  }
}

module.exports = WeatherService;
