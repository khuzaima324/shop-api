// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // Get All
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ name: 1 });
//     res.json(products);
//   } catch (err) { res.status(500).json(err); }
// });

// // Add Product
// router.post('/', async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const saved = await newProduct.save();
//     res.json(saved);
//   } catch (err) { res.status(500).json(err); }
// });

// // Update Product
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) { res.status(500).json(err); }
// });

// // Delete Product
// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Deleted" });
//   } catch (err) { res.status(500).json(err); }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get All
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) { 
    console.error("GET /products Error:", err);
    res.status(500).json(err); 
  }
});

// Add or Update Product (Sync Safe)
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    // Map the mobile app's 'id' to MongoDB's '_id'
    if (data.id) {
      data._id = data.id;
    }

    // Use findOneAndUpdate with 'upsert: true'
    // This prevents "Duplicate ID" errors if the app retries the sync
    const saved = await Product.findOneAndUpdate(
      { _id: data._id }, 
      data,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    
    res.json(saved);
  } catch (err) { 
    console.error("POST /products Error:", err);
    res.status(500).json(err); 
  }
});

// Update Product (Standard PUT)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { 
    console.error("PUT /products Error:", err);
    res.status(500).json(err); 
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) { 
    console.error("DELETE /products Error:", err);
    res.status(500).json(err); 
  }
});

module.exports = router;