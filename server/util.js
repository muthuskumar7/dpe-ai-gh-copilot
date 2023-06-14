const cities = require('./config/us-cities.json');
const isEmpty = require('lodash.isempty');

/**
 * Get latitude and longitude by City name
 */
function getCityById(id) {
  return cities.find(c => `${c.id}` === id);
}

module.exports = {
  getCityById,
};
