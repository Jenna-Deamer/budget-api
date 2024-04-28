const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

/**GET: /api/transactions => show all transactions*/
router.get('/', async(req, res, next) =>{
    let transactions = await Transaction.find().sort({'date': -1});

    return res.json(transactions).status(200);
});
//make public
module.exports = router;