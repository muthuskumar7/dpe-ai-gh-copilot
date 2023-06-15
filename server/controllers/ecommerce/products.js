/**
 * Create api functions to handle crud operations for products.
 */
const dbUtil = require('../../util/db');
const { PRODUCTS_COLLECTION_ID } = require('../../util/constants');

/**
 * @api {get} /api/ecommerce/products Get all products
 */
async function getProducts(req, res) {
  try {
    const products = await dbUtil.fetchAllData(PRODUCTS_COLLECTION_ID);
    res.json({ success: true, data: products });
  } catch (e) {
    console.error(`Error fetching products: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }   
}

/**
 * @api {get} /api/ecommerce/products/:id Get product by id
 */
async function getProductById(req, res) {
  try {
    const product = await dbUtil.fetchDataById(PRODUCTS_COLLECTION_ID, req.params.id);
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: `Product with id ${req.params.id} not found` });
    }
  } catch (e) {
    console.error(`Error fetching product: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

/**
 * @api {post} /api/ecommerce/products Add product
 */
async function addProduct(req, res) {
  try {
    let product = req.body;
    console.log('product', JSON.stringify(product, null, 2));
    const products = await dbUtil.fetchAllData(PRODUCTS_COLLECTION_ID);
    // Generate id for the new product. Increment the last id by 1.
    const id = `${Number(products[products.length - 1].id) + 1}`;
    product = Object.assign({id}, _omit(product, ['id']));
    await dbUtil.addData(PRODUCTS_COLLECTION_ID, product);
    res.json({ success: true, message: `Product added successfully`, data: product });
  } catch (e) {
    console.error(`Error adding product: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

/**
 * @api {put} /api/ecommerce/products/:id Update product
 */
async function updateProduct(req, res) {
  try {
    const product = { id: req.params.id, ...req.body };
    const success = await dbUtil.updateData(PRODUCTS_COLLECTION_ID, product);
    if (success) {
      res.json({ success: true, message: `Product updated successfully`, data: product });
    } else {
      res.status(404).json({ success: false, message: `Product with id ${req.params.id} not found` });
    }
  } catch (e) {
    console.error(`Error updating product: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

/**
 * @api {delete} /api/ecommerce/products/:id Delete product
 */
async function deleteProduct(req, res) {
  try {
    const success = await dbUtil.deleteData(PRODUCTS_COLLECTION_ID, req.params.id);
    if (success) {
      res.json({ success: true, message: `Product deleted successfully` });
    } else {
      res.status(404).json({ success: false, message: `Product with id ${req.params.id} not found` });
    }
  } catch (e) {
    console.error(`Error deleting product: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
