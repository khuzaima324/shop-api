// // const express = require('express');
// // const router = express.Router();
// // const Tailor = require('../models/Tailor');
// // const Ledger = require('../models/Ledger');

// // // Get Tailors (With Calculated Balance)
// // router.get('/', async (req, res) => {
// //   try {
// //     const tailors = await Tailor.find().sort({ name: 1 });
    
// //     // Calculate balance for each tailor on the fly
// //     const tailorsWithBalance = await Promise.all(tailors.map(async (t) => {
// //       const ledger = await Ledger.find({ tailor_id: t._id });
      
// //       const debit = ledger.filter(l => l.type === 'DEBIT').reduce((sum, l) => sum + l.amount, 0);
// //       const credit = ledger.filter(l => l.type === 'CREDIT').reduce((sum, l) => sum + l.amount, 0);
      
// //       return {
// //         _id: t._id,
// //         name: t.name,
// //         phone: t.phone,
// //         balance: debit - credit
// //       };
// //     }));

// //     res.json(tailorsWithBalance);
// //   } catch (err) { res.status(500).json(err); }
// // });

// // // Add Tailor
// // router.post('/', async (req, res) => {
// //   try {
// //     const newTailor = new Tailor(req.body);
// //     const saved = await newTailor.save();
// //     res.json(saved);
// //   } catch (err) { res.status(500).json(err); }
// // });

// // // Delete Tailor (And their History)
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Tailor.findByIdAndDelete(req.params.id);
// //     await Ledger.deleteMany({ tailor_id: req.params.id });
// //     res.json({ msg: "Deleted" });
// //   } catch (err) { res.status(500).json(err); }
// // });

// // // --- LEDGER ROUTES ---

// // // Get History for specific Tailor
// // router.get('/ledger/:id', async (req, res) => {
// //   try {
// //     const history = await Ledger.find({ tailor_id: req.params.id }).sort({ timestamp: -1 });
// //     res.json(history);
// //   } catch (err) { res.status(500).json(err); }
// // });

// // // Add Ledger Entry
// // router.post('/ledger', async (req, res) => {
// //   try {
// //     const entry = new Ledger(req.body);
// //     const saved = await entry.save();
// //     res.json(saved);
// //   } catch (err) { res.status(500).json(err); }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Tailor = require('../models/Tailor');
// const Ledger = require('../models/Ledger');

// // --- TAILOR MANAGEMENT ---

// // Get Tailors (With Calculated Balance)
// router.get('/', async (req, res) => {
//   try {
//     const tailors = await Tailor.find().sort({ name: 1 });
    
//     const tailorsWithBalance = await Promise.all(tailors.map(async (t) => {
//       const ledger = await Ledger.find({ tailor_id: t._id }); 
      
//       // Safe calculation with Number() fallback
//       const debit = ledger.filter(l => l.type === 'DEBIT').reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
//       const credit = ledger.filter(l => l.type === 'CREDIT').reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
      
//       return {
//         id: t._id, 
//         name: t.name,
//         phone: t.phone,
//         balance: debit - credit
//       };
//     }));

//     res.json(tailorsWithBalance);
//   } catch (err) { 
//     console.error("GET /tailors Error:", err);
//     res.status(500).json({ error: "Server failed to fetch tailor list." }); 
//   }
// });

// // Add/Update Tailor (Sync Safe)
// router.post('/', async (req, res) => {
//   try {
//     const data = req.body;
//     if (data.id) {
//       data._id = data.id; 
//     }

//     // FIX: Use findOneAndUpdate with upsert to prevent duplicate ID errors
//     const saved = await Tailor.findOneAndUpdate(
//       { _id: data._id },
//       data,
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     res.json(saved); 
//   } catch (err) { 
//     console.error("POST /tailors Error:", err);
//     res.status(500).json({ error: "Server failed to add tailor." }); 
//   }
// });

// // Delete Tailor (And their History)
// router.delete('/:id', async (req, res) => {
//   try {
//     await Tailor.findByIdAndDelete(req.params.id);
//     await Ledger.deleteMany({ tailor_id: req.params.id }); 
//     res.json({ msg: "Deleted" });
//   } catch (err) { 
//     console.error("DELETE /tailors Error:", err);
//     res.status(500).json({ error: "Server failed to delete tailor." }); 
//   }
// });

// // --- LEDGER ROUTES ---

// // Get ALL Ledger History for Full App Sync
// router.get('/ledger/all', async (req, res) => {
//     try {
//         const history = await Ledger.find().sort({ timestamp: -1 });
        
//         const formattedHistory = history.map(l => ({ 
//             id: l._id, 
//             tailor_id: l.tailor_id, 
//             description: l.description, 
//             amount: Number(l.amount) || 0, 
//             type: l.type, 
//             timestamp: l.timestamp
//         }));

//         res.json(formattedHistory);
//     } catch (err) {
//         console.error("GET /ledger/all Error:", err);
//         res.status(500).json({ error: "Failed to fetch all ledger entries." });
//     }
// });

// // Get History for specific Tailor
// router.get('/ledger/:id', async (req, res) => {
//   try {
//     const history = await Ledger.find({ tailor_id: req.params.id }).sort({ timestamp: -1 });
//     res.json(history.map(l => ({ 
//         id: l._id, 
//         tailor_id: l.tailor_id,
//         description: l.description, 
//         amount: Number(l.amount) || 0, 
//         type: l.type, 
//         timestamp: l.timestamp
//     })));
//   } catch (err) { 
//     console.error("GET /ledger/:id Error:", err);
//     res.status(500).json({ error: "Server failed to fetch tailor history." });
//   }
// });

// // Add/Update Ledger Entry (Sync Safe)
// router.post('/ledger', async (req, res) => {
//   try {
//     const data = req.body;
//     if (data.id) {
//         data._id = data.id; 
//     }
    
//     // FIX: Use findOneAndUpdate with upsert
//     const saved = await Ledger.findOneAndUpdate(
//         { _id: data._id },
//         {
//             ...data,
//             tailor_id: data.tailor_id // Ensure tailor_id is preserved
//         },
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     res.json(saved);
//   } catch (err) { 
//     console.error("POST /ledger Error:", err);
//     res.status(500).json({ error: "Server failed to add ledger entry." });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Tailor = require('../models/Tailor');
const Ledger = require('../models/Ledger');

// ==========================================
// 🧵 TAILOR MANAGEMENT ROUTES
// ==========================================

// 1. Get Tailors (With Calculated Balance)
// Endpoint: GET /api/tailors
router.get('/', async (req, res) => {
  try {
    const tailors = await Tailor.find().sort({ name: 1 });
    
    // Calculate balance for each tailor dynamically
    const tailorsWithBalance = await Promise.all(tailors.map(async (t) => {
      const ledger = await Ledger.find({ tailor_id: t._id }); 
      
      // Safe calculation with Number() fallback to prevent NaN errors
      const debit = ledger.filter(l => l.type === 'DEBIT').reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
      const credit = ledger.filter(l => l.type === 'CREDIT').reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
      
      return {
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

// 2. Add or Update Tailor (Sync Safe)
// Endpoint: POST /api/tailors
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    // Map the mobile app's 'id' to MongoDB's '_id'
    if (data.id) {
      data._id = data.id; 
    }

    // Use upsert: true to Create if it doesn't exist, or Update if it does
    const saved = await Tailor.findOneAndUpdate(
      { _id: data._id },
      data,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(saved); 
  } catch (err) { 
    console.error("POST /tailors Error:", err);
    res.status(500).json({ error: "Server failed to add tailor." }); 
  }
});

// 3. Delete Tailor (And their History)
// Endpoint: DELETE /api/tailors/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Tailor.findByIdAndDelete(id);
    await Ledger.deleteMany({ tailor_id: id }); // Clean up orphaned ledger entries
    res.json({ msg: "Deleted" });
  } catch (err) { 
    console.error("DELETE /tailors Error:", err);
    res.status(500).json({ error: "Server failed to delete tailor." }); 
  }
});



// ==========================================
// 📒 LEDGER ROUTES
// ==========================================

// ==========================================
// 🟢 NEW: Generic Route to Match Frontend Sync
// Endpoint: GET /api/tailors/ledger
// ==========================================
router.get('/ledger', async (req, res) => {
  try {
    // This performs the exact same logic as '/ledger/all'
    const history = await Ledger.find().sort({ timestamp: -1 });
    
    const formattedHistory = history.map(l => ({ 
        id: l._id, 
        tailor_id: l.tailor_id, 
        description: l.description, 
        amount: Number(l.amount) || 0, 
        type: l.type, 
        timestamp: l.timestamp
    }));

    res.json(formattedHistory);
  } catch (err) {
    console.error("GET /ledger Error:", err);
    res.status(500).json({ error: "Failed to fetch ledger entries." });
  }
});

// 4. Get ALL Ledger History (For Full App Sync/Restore)
// Endpoint: GET /api/tailors/ledger/all
router.get('/ledger/all', async (req, res) => {
  try {
    const history = await Ledger.find().sort({ timestamp: -1 });
    
    const formattedHistory = history.map(l => ({ 
        id: l._id, 
        tailor_id: l.tailor_id, 
        description: l.description, 
        amount: Number(l.amount) || 0, 
        type: l.type, 
        timestamp: l.timestamp
    }));

    res.json(formattedHistory);
  } catch (err) {
    console.error("GET /ledger/all Error:", err);
    res.status(500).json({ error: "Failed to fetch all ledger entries." });
  }
});

// 5. Get History for a specific Tailor
// Endpoint: GET /api/tailors/ledger/:id
router.get('/ledger/:id', async (req, res) => {
  try {
    const history = await Ledger.find({ tailor_id: req.params.id }).sort({ timestamp: -1 });
    
    // Format properly for frontend
    res.json(history.map(l => ({ 
        id: l._id, 
        tailor_id: l.tailor_id, 
        description: l.description, 
        amount: Number(l.amount) || 0, 
        type: l.type, 
        timestamp: l.timestamp
    })));
  } catch (err) { 
    console.error("GET /ledger/:id Error:", err);
    res.status(500).json({ error: "Server failed to fetch tailor history." });
  }
});

// 6. Add or Update Ledger Entry (Sync Safe)
// Endpoint: POST /api/tailors/ledger
router.post('/ledger', async (req, res) => {
  try {
    const data = req.body;
    if (data.id) {
        data._id = data.id; 
    }
    
    const saved = await Ledger.findOneAndUpdate(
        { _id: data._id },
        {
            ...data,
            tailor_id: data.tailor_id // Ensure the link is preserved
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(saved);
  } catch (err) { 
    console.error("POST /ledger Error:", err);
    res.status(500).json({ error: "Server failed to add ledger entry." });
  }
});

module.exports = router;