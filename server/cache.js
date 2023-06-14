'use strict';
/* All caches used in the application */
const NodeCache = require('node-cache');

const appCache = new NodeCache({ stdTTL: 60 }); // 60 seconds


function createCache(ttl = 0) { // 0 => no expiry
  return new NodeCache({ stdTTL: ttl });
}

module.exports = {
  appCache,
  createCache
};
