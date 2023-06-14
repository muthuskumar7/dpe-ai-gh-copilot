const _isEmpty = require('lodash.isempty');
const moment = require('moment');

const { getCityById, makeAPICall } = require('../util');
const { appCache } = require('../cache');
const usCities = require('../config/us-cities.json');

/**
 * Driving time
 */
async function getDrivingTime(req, res) {
  const { origin, destination } = req.query;
  const drivingCacheKey = `driving-${origin}-${destination}`;
  // console.log("drivingCacheKey", drivingCacheKey);
  // Retrieve data from cache
  const cachedData = appCache.get(drivingCacheKey);
  if(!_isEmpty(cachedData)) {
    // console.log('Fetching from Cache', cachedData);
    return res.json({ success: true, data: cachedData });
  }
  // Get City data
  const originCity = getCityById(origin);
  const destinationCity = getCityById(destination);
  // Invalid city Error case
  if (_isEmpty(originCity) || _isEmpty(destinationCity)) {
    return res.status(400).json({ success: false, message: `Invalid city identified. Please select valid origin and destination` });
  }
  // City label for better readability.
  const originCityLabel = `${originCity.name}, ${originCity.state}`;
  const destinationCityLabel = `${destinationCity.name}, ${destinationCity.state}`;
  
  // Map api
  let mapData = {};
  try {
    const mapApiKey = process.env.GOOGLE_MAPS_API_KEY;
    mapData = await makeAPICall(`https://maps.googleapis.com/maps/api/directions/json?destination=${destinationCity.name}&origin=${originCity.name}&key=${mapApiKey}`);
    // console.log(JSON.stringify(mapData, null, 2));
    const { status } = mapData;
    if (status === 'ZERO_RESULTS') {
      return res.status(404).json({ success: false, message: `No driving directions available between the cities - ${originCityLabel} and ${destinationCityLabel}` });
    }
  } catch(e) {
    console.error('Error fetch directions', e.message);
    return res.json({ success: false, message: `Unable to process your request. Please try again later.` });
  }

  // Just pull the first(best) route suggested by google.
  const { legs } = mapData.routes[0];
  // Supporting only between two cities so only one leg.
  let { distance: { text: distance }, duration: { text: duration } } = legs[0];
  // Call Weather api to see if one of the cities have rain and double the duration if so.
  let hasRainyCondition = false;
  try {
    const owApiKey = process.env.OPEN_WEATHER_API_KEY;
    const { coord: { lat: orginLat, lon: originLon } } = originCity;
    const originWeather = await makeAPICall(`https://api.openweathermap.org/data/2.5/weather?lat=${orginLat}&lon=${originLon}&units=imperial&appid=${owApiKey}`);
    const { weather: [ { main: originCondition }] } = originWeather;
    const { coord: { lat: destLat, lon: destLon } } = destinationCity;
    const destWeather = await makeAPICall(`https://api.openweathermap.org/data/2.5/weather?lat=${destLat}&lon=${destLon}&units=imperial&appid=${owApiKey}`);
    const { weather: [ { main: destCondition }] } = destWeather;

    // Double the duration when one of the cities' weather condition is Rain
    if([originCondition, destCondition].includes('Rain')) {
      const [ num, unit ] = duration.split(' ');
      duration = `${Number(num) * 2} ${unit}${Number(num) < 2 ? 's' : ''}`; 
      hasRainyCondition = true;
    }
  } catch(e) {
    console.log('Error fetching Weather information:', e.message);
  }

  // Response data
  const drivingTimeData = {
    distance,
    duration,
    origin: originCityLabel,
    destination: destinationCityLabel,
    hasRainyCondition
  };

  // Set in Cache
  appCache.set(drivingCacheKey, drivingTimeData);

  res.json({ success: true, data: drivingTimeData });
}
/**} 
 * Get weather for the city.
 * @param  {[type]} req  Request object from the api
 * @param  {[type]} res  Respoonse object to set data/error
 */
async function getWeatherByCity(req, res) {
  const { q: cityId } = req.query;

  // Get data from Cache if available. This avoids unnecessary call to weather api's 
  const cachedData = appCache.get(cityId);
  if (!_isEmpty(cachedData)) {
    return res.json({ success: true, data: cachedData });
  }

  // Get City's lat and lon details for the api call.
  const city = getCityById(cityId);
  // Error handling
  if (_isEmpty(city)) {
    return res.status(404).json({ success: false, message: 'City not found' });
  }

  const { coord: { lat, lon } } = city;
  const appId = process.env.OPEN_WEATHER_API_KEY;
  const resData = await makeAPICall(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${appId}`);
  // Error Handling
  if (_isEmpty(resData)) {
    return res.status(500).json({ success:false, message: 'Unable to fetch the details. Please try again later.' }); 
  } else if(resData.cod !== 200) {
    return res.status(400).json({ success: false,  message: 'Invalid city. Please enter a valid city name' });
  }

  const { weather, main } = resData;
  const weatherData = {
    city: `${city.name}, ${city.state}`,
    lat: city.coord.lat,
    lon: city.coord.lon,
    time: moment().format('hh:mm a z'),
    weather: weather[0].main,
    weatherDesc: weather[0].description,
    temp: Math.round(main.temp),
    feelsLikeTemp: `${Math.round(main.feels_like)}`,
    minTemp: `${Math.round(main.temp_min)}`,
    maxTemp:`${Math.round(main.temp_max)}`,
    humidity: Math.round(main.humidity) 
  };
  // Add to the Cache. Value will be stored for a min to avoid excessive calls.
  appCache.set(cityId, weatherData);

  res.json({
    success: true,
    data: weatherData
  });
}

/**
 * Filter cities by city name
 * @param  {[type]} req  Request object from the api
 * @param  {[type]} res  Respoonse object to set data/error
 */
function getCities(req, res) {
  const { q: city } = req.query;
  const cities = usCities.filter(c => c.name.toLowerCase().startsWith(city.toLowerCase()));
  res.json(cities);
}

module.exports = {
  getWeatherByCity,
  getCities,
  getDrivingTime
};
