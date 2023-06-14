// Load env variables (api keys)
require('dotenv').config();

const express = require("express");

const { getWeatherByCity, getCities, sampleApi, getDrivingTime } = require('./controller');

const PORT = process.env.PORT || 3001;
const app = express();

// Routes
app.get('/api', sampleApi);
app.get('/api/cities', getCities);
// Note: Weather and Google Maps API uses keys from .env file.
app.get('/api/weather', getWeatherByCity);
app.get('/api/drivingTime', getDrivingTime);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
