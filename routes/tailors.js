const express = require('express');
const router = express.Router();
const Tailor = require('../models/Tailor');
const Ledger = require('../models/Ledger');

// Get Tailors (With Calculated Balance)
router.get('/', async (req, res) => {
  try {
    const tailors = await Tailor.find().sort({ name: 1 });
    
    // Calculate balance for each tailor on the fly
    const tailorsWithBalance = await Promise.all(tailors.map(async (t) => {
      const ledger = await Ledger.find({ tailor_id: t._id });
      
      const debit = ledger.filter(l => l.type === 'DEBIT').reduce((sum, l) => sum + l.amount, 0);
      const credit = ledger.filter(l => l.type === 'CREDIT').reduce((sum, l) => sum + l.amount, 0);
      
      return {
        _id: t._id,
        name: t.name,
        phone: t.phone,
        balance: debit - credit
      };
    }));

    res.json(tailorsWithBalance);
  } catch (err) { res.status(500).json(err); }
});

// Add Tailor
router.post('/', async (req, res) => {
  try {
    const newTailor = new Tailor(req.body);
    const saved = await newTailor.save();
    res.json(saved);
  } catch (err) { res.status(500).json(err); }
});

// Delete Tailor (And their History)
router.delete('/:id', async (req, res) => {
  try {
    await Tailor.findByIdAndDelete(req.params.id);
    await Ledger.deleteMany({ tailor_id: req.params.id });
    res.json({ msg: "Deleted" });
  } catch (err) { res.status(500).json(err); }
});

// --- LEDGER ROUTES ---

// Get History for specific Tailor
router.get('/ledger/:id', async (req, res) => {
  try {
    const history = await Ledger.find({ tailor_id: req.params.id }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) { res.status(500).json(err); }
});

// Add Ledger Entry
router.post('/ledger', async (req, res) => {
  try {
    const entry = new Ledger(req.body);
    const saved = await entry.save();
    res.json(saved);
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;