const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Get Sales
router.get('/', async (req, res) => {
  try {
    // Optional: Filter by date range if passed in query
    const sales = await Sale.find().sort({ timestamp: -1 });
    res.json(sales);
  } catch (err) { res.status(500).json(err); }
});

// Add Sale (AND Reduce Stock)
router.post('/', async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    const savedSale = await newSale.save();

    // Inventory Logic: Only reduce if NOT machine work
    if (req.body.category !== 'machine') {
      await Product.findOneAndUpdate(
        { name: req.body.note }, // Find by name
        { $inc: { quantity: -req.body.quantity } } // Decrease qty
      );
    }

    res.json(savedSale);
  } catch (err) { res.status(500).json(err); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;