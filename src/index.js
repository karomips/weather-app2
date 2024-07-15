const express = require('express');
const bodyParser = require('body-parser');
const WeatherService = require('./weatherService');

const app = express();
const port = 3000;

// Replace with your actual API key
const apiKey = 'dcdf701f709543cc831120205242906';
const weatherService = new WeatherService(apiKey);

app.use(bodyParser.json());

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  try {
    const weatherData = await weatherService.searchWeatherByLocation(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.delete('/api/weather/cache', (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  weatherService.clearCache(city);
  res.send(`Cache cleared for city: ${city}`);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
