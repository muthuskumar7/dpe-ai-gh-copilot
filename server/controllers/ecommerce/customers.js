const _omit = require('lodash.omit');
const dbUtil = require('../../util/db');
const { CUSTOMERS_COLLECTION_ID } = require('../../util/constants');

/**
 * @api {get} /api/ecommerce/customers Get all customers
 */
async function getCustomers(req, res) {
  try {
    // const customers = await dbUtil.fetchCustomers();
    const customers = await dbUtil.fetchAllData(CUSTOMERS_COLLECTION_ID);
    const { page = 1, limit = 10 } = req.query;
    // Logic to paginate the results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < customers.length) {
      results.next = {
        page: Number(page) + 1,
        limit: Number(limit)
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: Number(page) - 1,
        limit: Number(limit)
      };
    }
    results.results = customers.slice(startIndex, endIndex);
    res.json({ success: true, data: results });
  } catch (e) {
    console.error(`Error fetching customers: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }   
}

/**
 * @api {get} /api/ecommerce/customers/:id Get customer by id
 */
async function getCustomerById(req, res) {
  try {
    // const customer = await dbUtil.fetchCustomerById(req.params.id);
    const customer = await dbUtil.fetchDataById(CUSTOMERS_COLLECTION_ID, req.params.id);
    if (customer) {
      res.json({ success: true, data: customer });
    } else {
      res.status(404).json({ success: false, message: `Customer with id ${req.params.id} not found` });
    }
  } catch (e) {
    console.error(`Error fetching customer: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

/**
 * @api {post} /api/ecommerce/customers Add customer
 */
async function addCustomer(req, res) {
  try {
    let customer = req.body;
    console.log('customer', JSON.stringify(customer, null, 2));
    // const customers = await dbUtil.fetchCustomers();
    const customers = await dbUtil.fetchAllData(CUSTOMERS_COLLECTION_ID);
    // Generate id for the new customer. Increment the last id by 1.
    const id = `${Number(customers[customers.length - 1].id) + 1}`;
    customer = Object.assign({id}, _omit(customer, ['id']));
    await dbUtil.addData(CUSTOMERS_COLLECTION_ID, customer);
    res.json({ success: true, message: `Customer added successfully`, data: customer });
  } catch (e) {
    console.error(`Error adding customer: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

/**
 * @api {put} /api/ecommerce/customers/:id Update customer
 */
async function updateCustomer(req, res) {
  try {
    const customer = { id: req.params.id, ...req.body };
    // const success = await dbUtil.updateCustomer(customer);
    const success = await dbUtil.updateData(CUSTOMERS_COLLECTION_ID, customer);
    if (success) {
      res.json({ success: true, message: `Customer updated successfully`, data: customer });
    } else {
      res.status(404).json({ success: false, message: `Customer with id ${req.params.id} not found` });
    }
  } catch (e) {
    console.error(`Error updating customer: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

/**
 * @api {delete} /api/ecommerce/customers/:id Delete customer
 */
async function deleteCustomer(req, res) {
  try {
    // const success = await dbUtil.deleteCustomer(req.params.id);
    const success = await dbUtil.deleteData(CUSTOMERS_COLLECTION_ID, req.params.id);
    if (success) {
      res.json({ success: true, message: `Customer deleted successfully` });
    } else {
      res.status(404).json({ success: false, message: `Customer with id ${req.params.id} not found` });
    }
  } catch (e) {
    console.error(`Error deleting customer: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer
};
