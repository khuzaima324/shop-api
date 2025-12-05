const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Adjust path to your models folder

// 1. Sync Expense (Create or Update)
// Endpoint: POST /api/expenses
router.post('/', async (req, res) => {
  try {
    const { id, title, amount, category, timestamp } = req.body;
    await Expense.findOneAndUpdate(
      { id }, 
      { title, amount, category, timestamp }, 
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Delete Expense
// Endpoint: DELETE /api/expenses/:id
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get All Expenses
// Endpoint: GET /api/expenses
router.get('/', async (req, res) => {
  try {
    const data = await Expense.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;