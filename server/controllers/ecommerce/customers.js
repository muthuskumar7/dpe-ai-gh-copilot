const _omit = require('lodash.omit');
const dbUtil = require('../db');
/**
 * @api {get} /api/ecommerce/customers Get all customers
 */
async function getCustomers(req, res) {
  try {
    const customers = await dbUtil.fetchCustomers();
    res.json({ success: true, data: customers });
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
    const customer = await dbUtil.fetchCustomerById(req.params.id);
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
    const customers = await dbUtil.fetchCustomers();
    // Generate id for the new customer. Increment the last id by 1.
    const id = `${Number(customers[customers.length - 1].id) + 1}`;
    customer = Object.assign({id}, _omit(customer, ['id']));
    await dbUtil.addCustomer(customer);
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
    const success = await dbUtil.updateCustomer(customer);
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
    const success = await dbUtil.deleteCustomer(req.params.id);
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
