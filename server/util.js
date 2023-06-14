const cities = require('./config/us-cities.json');
const rp = require('request-promise');

/**
 * Get latitude and longitude by City name
 */
function getCityById(id) {
  return cities.find(c => `${c.id}` === id);
}

/**
 * Make API call for the given api url
 */
async function makeAPICall(url) {
  return await rp(url, { json: true, rejectUnauthorized: false });
}

module.exports = {
  getCityById,
  makeAPICall
};
