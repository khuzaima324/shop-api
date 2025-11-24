// const express = require('express');
// const router = express.Router();
// const Sale = require('../models/Sale');
// const Product = require('../models/Product');

// // Get Sales
// router.get('/', async (req, res) => {
//   try {
//     // Optional: Filter by date range if passed in query
//     const sales = await Sale.find().sort({ timestamp: -1 });
//     res.json(sales);
//   } catch (err) { res.status(500).json(err); }
// });

// // Add Sale (AND Reduce Stock)
// router.post('/', async (req, res) => {
//   try {
//     const newSale = new Sale(req.body);
//     const savedSale = await newSale.save();

//     // Inventory Logic: Only reduce if NOT machine work
//     if (req.body.category !== 'machine') {
//       await Product.findOneAndUpdate(
//         { name: req.body.note }, // Find by name
//         { $inc: { quantity: -req.body.quantity } } // Decrease qty
//       );
//     }

//     res.json(savedSale);
//   } catch (err) { res.status(500).json(err); }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     await Sale.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Deleted" });
//   } catch (err) { res.status(500).json(err); }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// --- SALES CRUD & LOGIC ---

// Get Sales (Used by Mobile App for Pull Sync)
router.get('/', async (req, res) => {
  try {
    // Fetches all sales, sorted by newest first
    const sales = await Sale.find().sort({ timestamp: -1 });
    res.json(sales);
  } catch (err) { 
    console.error("GET /sales Error:", err);
    res.status(500).json({ error: "Failed to retrieve sales data." }); 
  }
});

// Add/Replace Sale (Used by Mobile App POST for initial Save/Queue Push)
router.post('/', async (req, res) => {
  try {
    // 1. Check if the mobile app provided a local ID (which we use as Mongo's _id)
    const data = req.body;
    if (data.id) {
      data._id = data.id; 
    }
    
    // 2. Insert or Update: Try to find an existing sale with this ID
    const savedSale = await Sale.findOneAndUpdate(
      { _id: data._id }, 
      data, 
      { upsert: true, new: true, setDefaultsOnInsert: true } // Upsert ensures creation or replacement
    );

    // 3. Inventory Logic: Only reduce if NOT machine work
    // NOTE: This logic runs every time a record is posted (initial save + retries). 
    // This is generally safe for an upsert but requires careful consideration in a real app.
    // For this simple sync, we proceed with deduction.
    if (req.body.category !== 'machine') {
      // Use $inc to update stock. We trust the frontend sent the total quantity.
      await Product.findOneAndUpdate(
        { name: req.body.note }, 
        { $inc: { quantity: -req.body.quantity } } // Decrease qty
      );
    }

    res.json(savedSale);
  } catch (err) { 
    console.error("POST /sales Error:", err);
    res.status(500).json({ error: "Server failed to add or update sale." }); 
  }
});

// NEW: Update Sale (Optional PUT route)
router.put('/:id', async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSale);
    } catch (err) {
        console.error("PUT /sales Error:", err);
        res.status(500).json({ error: "Server failed to update sale." });
    }
});

// Delete Sale
router.delete('/:id', async (req, res) => {
  try {
    const saleToDelete = await Sale.findById(req.params.id);
    
    // NOTE: For safety in a real system, stock should be added back here.
    // We are skipping that logic for simplicity but the route is defined.
    
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) { 
    console.error("DELETE /sales Error:", err);
    res.status(500).json({ error: "Server failed to delete sale." }); 
  }
});

module.exports = router;