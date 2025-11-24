// const express = require('express');
// const router = express.Router();
// const Tailor = require('../models/Tailor');
// const Ledger = require('../models/Ledger');

// // Get Tailors (With Calculated Balance)
// router.get('/', async (req, res) => {
//   try {
//     const tailors = await Tailor.find().sort({ name: 1 });
    
//     // Calculate balance for each tailor on the fly
//     const tailorsWithBalance = await Promise.all(tailors.map(async (t) => {
//       const ledger = await Ledger.find({ tailor_id: t._id });
      
//       const debit = ledger.filter(l => l.type === 'DEBIT').reduce((sum, l) => sum + l.amount, 0);
//       const credit = ledger.filter(l => l.type === 'CREDIT').reduce((sum, l) => sum + l.amount, 0);
      
//       return {
//         _id: t._id,
//         name: t.name,
//         phone: t.phone,
//         balance: debit - credit
//       };
//     }));

//     res.json(tailorsWithBalance);
//   } catch (err) { res.status(500).json(err); }
// });

// // Add Tailor
// router.post('/', async (req, res) => {
//   try {
//     const newTailor = new Tailor(req.body);
//     const saved = await newTailor.save();
//     res.json(saved);
//   } catch (err) { res.status(500).json(err); }
// });

// // Delete Tailor (And their History)
// router.delete('/:id', async (req, res) => {
//   try {
//     await Tailor.findByIdAndDelete(req.params.id);
//     await Ledger.deleteMany({ tailor_id: req.params.id });
//     res.json({ msg: "Deleted" });
//   } catch (err) { res.status(500).json(err); }
// });

// // --- LEDGER ROUTES ---

// // Get History for specific Tailor
// router.get('/ledger/:id', async (req, res) => {
//   try {
//     const history = await Ledger.find({ tailor_id: req.params.id }).sort({ timestamp: -1 });
//     res.json(history);
//   } catch (err) { res.status(500).json(err); }
// });

// // Add Ledger Entry
// router.post('/ledger', async (req, res) => {
//   try {
//     const entry = new Ledger(req.body);
//     const saved = await entry.save();
//     res.json(saved);
//   } catch (err) { res.status(500).json(err); }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Tailor = require('../models/Tailor');
const Ledger = require('../models/Ledger');

// --- TAILOR MANAGEMENT ---

// Get Tailors (With Calculated Balance)
router.get('/', async (req, res) => {
  try {
    const tailors = await Tailor.find().sort({ name: 1 });
    
    // Calculate balance for each tailor on the fly
    const tailorsWithBalance = await Promise.all(tailors.map(async (t) => {
      // Find history using MongoDB's _id
      const ledger = await Ledger.find({ tailor_id: t._id }); 
      
      const debit = ledger.filter(l => l.type === 'DEBIT').reduce((sum, l) => sum + l.amount, 0);
      const credit = ledger.filter(l => l.type === 'CREDIT').reduce((sum, l) => sum + l.amount, 0);
      
      return {
        // Return Mongo _id as 'id' for mobile app compatibility
        id: t._id, 
        name: t.name,
        phone: t.phone,
        balance: debit - credit
      };
    }));

    res.json(tailorsWithBalance);
  } catch (err) { 
    console.error("GET /tailors Error:", err);
    res.status(500).json({ error: "Server failed to fetch tailor list." }); 
  }
});

// Add Tailor (Uses custom mobile ID if provided)
router.post('/', async (req, res) => {
  try {
    // Check if mobile app sent a local ID (req.body.id) and use it as Mongo's _id
    const data = req.body;
    if (data.id) {
        data._id = data.id; 
    }

    const newTailor = new Tailor(data);
    const saved = await newTailor.save();
    // Return the saved object, which includes the MongoDB _id
    res.json(saved); 
  } catch (err) { 
    console.error("POST /tailors Error:", err);
    res.status(500).json({ error: "Server failed to add tailor." }); 
  }
});

// Delete Tailor (And their History)
router.delete('/:id', async (req, res) => {
  try {
    await Tailor.findByIdAndDelete(req.params.id);
    // Delete all related ledger entries
    await Ledger.deleteMany({ tailor_id: req.params.id }); 
    res.json({ msg: "Deleted" });
  } catch (err) { 
    console.error("DELETE /tailors Error:", err);
    res.status(500).json({ error: "Server failed to delete tailor." }); 
  }
});

// --- LEDGER ROUTES ---

// NEW: Get ALL Ledger History for Full App Sync (Needed for syncData -> pullFromCloud)
router.get('/ledger/all', async (req, res) => {
    try {
        const history = await Ledger.find().sort({ timestamp: -1 });
        
        // Map _id and tailor_id to strings to match the mobile app's interfaces
        const formattedHistory = history.map(l => ({ 
            id: l._id, 
            tailor_id: l.tailor_id, // This is the Mongo _id of the tailor
            description: l.description, 
            amount: l.amount, 
            type: l.type, 
            timestamp: l.timestamp
        }));

        res.json(formattedHistory);
    } catch (err) {
        console.error("GET /ledger/all Error:", err);
        res.status(500).json({ error: "Failed to fetch all ledger entries for sync." });
    }
});


// Get History for specific Tailor (Used when viewing a single profile on the app)
router.get('/ledger/:id', async (req, res) => {
  try {
    const history = await Ledger.find({ tailor_id: req.params.id }).sort({ timestamp: -1 });
    res.json(history.map(l => ({ 
        id: l._id, 
        tailor_id: l.tailor_id,
        description: l.description, 
        amount: l.amount, 
        type: l.type, 
        timestamp: l.timestamp
    })));
  } catch (err) { 
    console.error("GET /ledger/:id Error:", err);
    res.status(500).json({ error: "Server failed to fetch tailor history." });
  }
});

// Add Ledger Entry (Used by mobile app to add work/payment)
router.post('/ledger', async (req, res) => {
  try {
    const data = req.body;
    if (data.id) {
        data._id = data.id; // Use mobile app's local ID as Mongo's _id
    }
    
    // Ensure the tailor_id is correctly mapped from the mobile app's string ID
    const entry = new Ledger({
        ...data,
        tailor_id: data.tailor_id // Should already be the Mongo string ID
    }); 

    const saved = await entry.save();
    res.json(saved);
  } catch (err) { 
    console.error("POST /ledger Error:", err);
    res.status(500).json({ error: "Server failed to add ledger entry." });
  }
});

module.exports = router;