/**
 * Util functions to connect to the database.
 */
const fsp = require('fs').promises;
const path = require('path');
const CUSTOMERS_DATA_FILE = path.join(__dirname, 'config/db/customers.json');

/**
 * Fetch all customers from the database.
 */
async function fetchCustomers() {
  const customers = await fsp.readFile(CUSTOMERS_DATA_FILE, 'utf8');
  return JSON.parse(customers);
}

/**
 * Fetch customer by id from the database.
 */
async function fetchCustomerById(id) {
  const customers = await fetchCustomers();
  return customers.find(c => c.id === id);
}

/**
 * Add customer to the database.
 */
async function addCustomer(customer) {
  const customers = await fetchCustomers();
  customers.push(customer);
  await fsp.writeFile(CUSTOMERS_DATA_FILE, JSON.stringify(customers, null, 2));
}

/**
 * Update customer in the database.
 */
async function updateCustomer(customer) {
  const customers = await fetchCustomers();
  const index = customers.findIndex(c => c.id === customer.id);
  console.log('index', index);
  if (index !== -1) {
    customers[index] = customer;
    await fsp.writeFile(CUSTOMERS_DATA_FILE, JSON.stringify(customers, null, 2));
    return true;
  }
  // When customer info not found.
  return false;
}

/**
 * Delete customer from the database.
 */
async function deleteCustomer(id) {
  const customers = await fetchCustomers();
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers.splice(index, 1);
    await fsp.writeFile(CUSTOMERS_DATA_FILE, JSON.stringify(customers, null, 2));
    return true;
  }
  // When customer info not found.
  return false;
}

module.exports = {
  fetchCustomers,
  fetchCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer
};
