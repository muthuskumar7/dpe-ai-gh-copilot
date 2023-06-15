const _omit = require('lodash/omit');
const dbUtil = require('../../util/db');
const { PURCHASES_COLLECTION_ID } = require('../../util/constants');

/**
 * api function for add purchase
 */
async function addPurchase(req, res) {
  try {
    let purchase = req.body;
    console.log('purchase', JSON.stringify(purchase, null, 2));
    const purchases = await dbUtil.fetchAllData(PURCHASES_COLLECTION_ID);
    // Generate id for the new purchase. Increment the last id by 1.
    const id = `${Number(purchases[purchases.length - 1].id) + 1}`;
    purchase = Object.assign({id}, _omit(purchase, ['id']));
    await dbUtil.addData(PURCHASES_COLLECTION_ID, purchase);
    res.json({ success: true, message: `Purchase added successfully`, data: purchase });
  } catch (e) {
    console.error(`Error adding purchase: ${e.message}`);
    res.status(500).json({ success: false, message: `Unable to process your request. Please try again later` });
  }
}

module.exports = {
  addPurchase
};
