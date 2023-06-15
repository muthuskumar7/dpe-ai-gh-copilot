const customers = require('./customers');
const products = require('./products');
const purchases = require('./purchases');

module.exports = {
  ...customers,
  ...products,
  ...purchases
};
