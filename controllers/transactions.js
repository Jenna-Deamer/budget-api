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
    console.log("Transaction created:", transaction); // Log the created transaction
    return res.json(transaction).status(201); // Respond with the created transaction
  } catch (err) {
    console.error("Error creating transaction:", err); // Log any errors that occur during transaction creation
    return res.json(err).status(400); // Respond with the error status and message
  }
});

/* DELETE: /api/transaction/abc123 => delete selected transaction */
router.delete('/:_id', async (req, res, next) => {
  try {
      await Transaction.findByIdAndDelete(req.params._id);
      return res.json({}).status(204); // 204: No Content
  }
  catch(err) {
      return res.json(err).status(404); //not Found
  }
});

/* GET: /api/transactions/:id => get transaction by ID */
router.get('/:_id', async (req, res, next) => {
  try {
    await Transaction.findById(req.params._id);
    
    if (!Transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(Transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/*PUT: /api/transactions/abc123 => update selected transaction */
router.put('/:_id',async (req,res,next) =>{
  try{
    let transaction = await Transaction.findByIdAndUpdate(req.params._id, req.body);
    return res.json(transaction).status(202) ///202: Resource Modified 
  }
  catch(err){
    return res.json(err).status(404); //not found
  }
});
//make public
module.exports = router;
