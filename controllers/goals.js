const express = require("express");
const router = express.Router();
const Goal = require("../models/goal");

/**GET: all goals**/
router.get("/", async (req, res, next) => {
    try {
      let goals = await Goal.find().sort({ date: -1 });
  
      return res.json(goals).status(200); //200: OK
    } catch (err) {
      return res.json(err).status(400); //400: Bad Request
    }
  });
  
/*POST: /api/goals => create new goal from http req body */
router.post('/', async (req, res, next) => {
    try {
      const goal = await Goal.create(req.body);
      console.log("Goal created:", goal); 
      return res.json(goal).status(201); // Respond with the created goal
    } catch (err) {
      console.error("Error creating goal:", err); // Log any errors that occur during goal creation
      return res.json(err).status(400); // Respond with the error status and message
    }
  });

/* GET: /api/goals/:id => get goal by ID */
router.get('/:_id', async (req, res, next) => {
    try {
      const goal = await Goal.findById(req.params._id);
  
      //if empty/null return 404
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
  
      return res.json(goal).status(200); //if found, return OK
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

/*PUT: /api/goals/abc123 => update selected goal */

router.put('/:_id', async (req, res, next) => {
    try {
      const goal = await Goal.findByIdAndUpdate(req.params._id, req.body, { new: true });
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      return res.json(goal).status(200);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  
//make public
module.exports = router;