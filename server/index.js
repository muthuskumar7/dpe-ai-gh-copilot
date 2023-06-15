// Load env variables (api keys)
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");

const { sampleApi } = require('./controllers');
const { getWeatherByCity, getCities, getDrivingTime } = require('./controllers/weather');
const ecommerce = require('./controllers/ecommerce');

const PORT = process.env.PORT || 3001;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Routes
app.get('/api', sampleApi);

/**
 *  Weather application API's
 *  Note: Weather and Google Maps API uses keys from .env file.
 */
app.get('/api/cities', getCities);
app.get('/api/weather', getWeatherByCity);
app.get('/api/drivingTime', getDrivingTime);

/**
 *  Ecommerce application API's
 */
// Customers api's
app.get('/api/ecommerce/customers', ecommerce.getCustomers);
app.get('/api/ecommerce/customers/:id', ecommerce.getCustomerById);
app.post('/api/ecommerce/customers', ecommerce.addCustomer);
app.put('/api/ecommerce/customers/:id', ecommerce.updateCustomer);
app.delete('/api/ecommerce/customers/:id', ecommerce.deleteCustomer);
// Products api's
app.get('/api/ecommerce/products', ecommerce.getProducts);
app.get('/api/ecommerce/products/:id', ecommerce.getProductById);
app.post('/api/ecommerce/products', ecommerce.addProduct);
// app.put('/api/ecommerce/products/:id', ecommerce.updateProduct);
// app.delete('/api/ecommerce/products/:id', ecommerce.deleteProduct);
// Purchase api's
app.post('/api/ecommerce/purchases', ecommerce.addPurchase);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
