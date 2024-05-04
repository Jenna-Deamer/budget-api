const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

/**GET: /api/transactions => show all transactions*/
router.get("/", async (req, res, next) => {
  try {
    let transactions = await Transaction.find().sort({ date: -1 });

    return res.json(transactions).status(200); //200: OK
  } catch (err) {
    return res.json(err).status(400); //400: Bad Request
  }
});
/*POST: /api/transactions => create new transaction from http req body */
router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.json(transaction).status(201); //201: Resource
  } catch (err) {
    return res.json(err).status(400);
  }
});

//make public
module.exports = router;
