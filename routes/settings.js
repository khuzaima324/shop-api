const express = require('express');
const router = express.Router();
// 👇 Make sure this path matches where your Settings model is located
const Settings = require('../models/Setting'); 

// 1. Add/Update Setting (Rent, Shop Name, etc.)
// Endpoint: POST /api/settings
router.post('/', async (req, res) => {
  try {
    const { key, value } = req.body;
    
    // Fallback: If frontend sends data like { "last_rent_date": "12345" } instead of key/value
    const finalKey = key || Object.keys(req.body)[0]; 
    const finalValue = value || req.body[finalKey];

    // Update or Create the setting
    await Settings.findOneAndUpdate(
      { key: finalKey },
      { key: finalKey, value: finalValue },
      { upsert: true, new: true }
    );
    
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Settings Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get All Settings
// Endpoint: GET /api/settings
router.get('/', async (req, res) => {
  try {
    const data = await Settings.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👇 This must be at the very end
module.exports = router;