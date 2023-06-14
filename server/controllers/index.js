/**
 * Sample api to test the api health
 * @param  {object} req  Request object from the api
 * @param  {object} res  Respoonse object to set data/error
 */
function sampleApi(req, res) {
  res.json({ success: true, message: 'Hello from server' });
}

module.exports = {
  sampleApi
};
