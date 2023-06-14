// Load env variables (api keys)
require('dotenv').config();

const express = require("express");

const { getWeatherByCity, getCities, getDrivingTime } = require('./controllers/weather');
const { sampleApi } = require('./controllers');

const PORT = process.env.PORT || 3001;
const app = express();

// Routes
app.get('/api', sampleApi);

/**
 *  Weather application API's
 *  Note: Weather and Google Maps API uses keys from .env file.
 */
app.get('/api/cities', getCities);
app.get('/api/weather', getWeatherByCity);
app.get('/api/drivingTime', getDrivingTime);

/**
 *  Ecommerce application API's
 */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
