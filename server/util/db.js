/**
 * Util functions to connect to the database.
 */
const fsp = require('fs').promises;
const path = require('path');

const CONSTANTS = require('./constants');

const CUSTOMERS_DATA_FILE = path.join(__dirname, '../config/db/customers.json');
const PRODUCTS_DATA_FILE = path.join(__dirname, '../config/db/products.json');
const PURCHASES_DATA_FILE = path.join(__dirname, '../config/db/purchases.json');

/**
 * Fetch all data from the database.
 */
async function fetchAllData(collectionId) {
  const collection = getCollectionById(collectionId);
  const data = await fsp.readFile(collection, 'utf8');
  return JSON.parse(data);
}

/**
 * Fetch data by id from the database.
 */
async function fetchDataById(collectionId, id) {
  const data = await fetchAllData(collectionId);
  return data.find(c => c.id === id);
}

/**
 * Add data to the database.
 */
async function addData(collectionId, data) {
  const collection = getCollectionById(collectionId);
  const allData = await fetchAllData(collectionId);
  allData.push(data);
  await fsp.writeFile(collection, JSON.stringify(allData, null, 2));
}

/**
 * Update data in the database.
 */
async function updateData(collectionId, data) {
  const collection = getCollectionById(collectionId);
  const allData = await fetchAllData(collectionId);
  const index = allData.findIndex(c => c.id === data.id);
  console.log('index', index);
  if (index !== -1) {
    allData[index] = data;
    await fsp.writeFile(collection, JSON.stringify(allData, null, 2));
    return true;
  }
  // When data not found.
  return false;
}

/**
 * Delete data from the database.
 */
async function deleteData(collectionId, id) {
  const collection = getCollectionById(collectionId);
  const allData = await fetchAllData(collectionId);
  const index = allData.findIndex(c => c.id === id);
  if (index !== -1) {
    allData.splice(index, 1);
    await fsp.writeFile(collection, JSON.stringify(allData, null, 2));
    return true;
  }
  // When data not found.
  return false;
}

/**
 * Get collection by type
 */
function getCollectionById (id) {
  switch (id) {
    case CONSTANTS.CUSTOMERS_COLLECTION_ID:
      return CUSTOMERS_DATA_FILE;
    case CONSTANTS.PRODUCTS_COLLECTION_ID:
      return PRODUCTS_DATA_FILE;
    case CONSTANTS.PURCHASES_COLLECTION_ID:
      return PURCHASES_DATA_FILE;
    default:
      return null;
  }
}

module.exports = {
  fetchAllData,
  fetchDataById,
  addData,
  updateData,
  deleteData
};
