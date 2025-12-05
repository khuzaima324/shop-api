// // // const express = require('express');
// // // const router = express.Router();
// // // const Supplier = require('../models/Supplier');
// // // const SupplierLedger = require('../models/SupplierLedger');
// // // const PurchaseOrder = require('../models/PurchaseOrder'); // 👈 NEW IMPORT

// // // // 1. Add/Update Supplier
// // // // Endpoint: POST /api/suppliers
// // // router.post('/', async (req, res) => {
// // //   try {
// // //     const { id, name, phone } = req.body;
// // //     await Supplier.findOneAndUpdate(
// // //       { id }, 
// // //       { name, phone }, 
// // //       { upsert: true, new: true }
// // //     );
// // //     res.status(200).json({ success: true });
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // // 2. Get Suppliers
// // // // Endpoint: GET /api/suppliers
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     const data = await Supplier.find();
// // //     res.json(data);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // // 3. Add Ledger Entry
// // // // Endpoint: POST /api/suppliers/ledger
// // // router.post('/ledger', async (req, res) => {
// // //   try {
// // //     const { id, supplier_id, description, amount, type, timestamp } = req.body;
// // //     await SupplierLedger.findOneAndUpdate(
// // //       { id }, 
// // //       { supplier_id, description, amount, type, timestamp }, 
// // //       { upsert: true, new: true }
// // //     );
// // //     res.status(200).json({ success: true });
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // // 4. Get Ledger History
// // // // Endpoint: GET /api/suppliers/ledger/all
// // // router.get('/ledger/all', async (req, res) => {
// // //   try {
// // //     const data = await SupplierLedger.find();
// // //     res.json(data);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // module.exports = router;

// // // // 5. Record Purchase Order
// // // router.post('/purchase', async (req, res) => {
// // //   try {
// // //     const { supplierId, items, totalAmount, paidCash, timestamp } = req.body;
    
// // //     // We use the timestamp as the ID here for simplicity and uniqueness
// // //     const purchase_id = `PUR-${timestamp}`; 

// // //     await PurchaseOrder.findOneAndUpdate(
// // //       { purchase_id },
// // //       { 
// // //         supplier_id: supplierId,
// // //         items: items,
// // //         totalAmount: totalAmount,
// // //         paidCash: paidCash,
// // //         timestamp: timestamp
// // //       },
// // //       { upsert: true, new: true }
// // //     );
// // //     res.status(200).json({ success: true });
// // //   } catch (err) {
// // //     console.error("Purchase Order Sync Error:", err);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const Supplier = require('../models/Supplier'); // 🟢 CORRECTED IMPORT
// // const SupplierLedger = require('../models/SupplierLedger'); // 🟢 CORRECTED IMPORT
// // const PurchaseOrder = require('../models/PurchaseOrder'); // 🟢 CORRECTED IMPORT

// // // 1. Add/Update Supplier Profile
// // // Endpoint: POST /api/suppliers
// // router.post('/', async (req, res) => {
// //   try {
// //     const { id, name, phone } = req.body;
// //     await Supplier.findOneAndUpdate(
// //       { id }, 
// //       { name, phone }, 
// //       { upsert: true, new: true }
// //     );
// //     res.status(200).json({ success: true });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 2. Get Suppliers
// // // Endpoint: GET /api/suppliers
// // router.get('/', async (req, res) => {
// //   try {
// //     const data = await Supplier.find();
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 3. Add Ledger Entry
// // // Endpoint: POST /api/suppliers/ledger
// // router.post('/ledger', async (req, res) => {
// //   try {
// //     const { id, supplier_id, description, amount, type, timestamp } = req.body;
// //     await SupplierLedger.findOneAndUpdate(
// //       { id }, 
// //       { supplier_id, description, amount, type, timestamp }, 
// //       { upsert: true, new: true }
// //     );
// //     res.status(200).json({ success: true });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 4. Get Ledger History
// // // Endpoint: GET /api/suppliers/ledger/all
// // router.get('/ledger/all', async (req, res) => {
// //   try {
// //     const data = await SupplierLedger.find();
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 5. Record Full Stock Purchase
// // // Endpoint: POST /api/suppliers/purchase
// // router.post('/purchase', async (req, res) => {
// //   try {
// //     const { supplierId, items, totalAmount, paidCash, timestamp } = req.body;
// //     const purchase_id = `PUR-${timestamp}`; 

// //     await PurchaseOrder.findOneAndUpdate(
// //       { purchase_id },
// //       { 
// //         supplier_id: supplierId,
// //         items: items,
// //         totalAmount: totalAmount,
// //         paidCash: paidCash,
// //         timestamp: timestamp
// //       },
// //       { upsert: true, new: true }
// //     );
// //     res.status(200).json({ success: true });
// //   } catch (err) {
// //     console.error("Purchase Order Sync Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Supplier = require('../models/Supplier');
// const SupplierLedger = require('../models/SupplierLedger');
// // const PurchaseOrder = require('../models/PurchaseOrder'); // Optional: Keep if you use it for inventory history

// // 1. Add/Update Supplier Profile
// router.post('/', async (req, res) => {
//   try {
//     const { id, name, phone } = req.body;
//     await Supplier.findOneAndUpdate(
//       { id }, 
//       { name, phone }, 
//       { upsert: true, new: true }
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. Get Suppliers
// router.get('/', async (req, res) => {
//   try {
//     const data = await Supplier.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 3. Add Ledger Entry (Simple Payment/Debit)
// router.post('/ledger', async (req, res) => {
//   try {
//     const { id, supplierId, supplier_id, description, amount, type, timestamp } = req.body;
//     // Handle both supplierId (frontend) and supplier_id (backend) naming
//     const finalSupplierId = supplier_id || supplierId;

//     await SupplierLedger.findOneAndUpdate(
//       { id }, 
//       { supplier_id: finalSupplierId, description, amount, type, timestamp }, 
//       { upsert: true, new: true }
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 4. Get Ledger History
// router.get('/ledger/all', async (req, res) => {
//   try {
//     const data = await SupplierLedger.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟢 5. Record Full Stock Purchase (THE FIX)
// router.post('/purchase', async (req, res) => {
//   try {
//     // Destructure all fields sent by frontend
//     const { id, supplierId, items, amount, description, type, paidCash, timestamp } = req.body;

//     // 1. Save the MAIN Purchase Entry to SupplierLedger
//     await SupplierLedger.findOneAndUpdate(
//       { id: id }, 
//       { 
//         supplier_id: supplierId, 
//         description: description || `Purchased ${items ? items.length : 0} items`, 
//         amount: amount, 
//         type: type || 'PURCHASE', 
//         timestamp: timestamp 
//       },
//       { upsert: true, new: true }
//     );

//     // 2. If Paid Cash immediately, save the PAYMENT Entry to SupplierLedger
//     if (paidCash) {
//       // We reconstruct the ID exactly how the frontend does: "pay-" + timestamp
//       const payId = `pay-${timestamp}`; 
      
//       await SupplierLedger.findOneAndUpdate(
//         { id: payId },
//         { 
//           supplier_id: supplierId, 
//           description: 'Cash Paid on Purchase', 
//           amount: amount, 
//           type: 'PAYMENT', 
//           timestamp: timestamp + 1 // +1 ms to ensure ordering
//         },
//         { upsert: true, new: true }
//       );
//     }

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Purchase Sync Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });
// // --- ADD THIS TO YOUR BACKEND (Node.js/Express) ---

// // --- ADD THIS TO YOUR BACKEND SERVER CODE ---

// router.delete('/suppliers/:id', async (req, res) => {
//   try {
//     const { id } = req.params; 

//     // Delete from MongoDB using the custom 'id' string (not _id)
//     const result = await Supplier.deleteOne({ id: id }); 

//     // Optional: Delete history too if you have a model for it
//     // await SupplierLedger.deleteMany({ supplier_id: id });

//     if (result.deletedCount > 0) {
//       res.json({ message: "Supplier deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Supplier not found" });
//     }
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
// module.exports = router;


const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const SupplierLedger = require('../models/SupplierLedger');
const Product = require('../models/Product'); // 👈 Add this

// 1. Add/Update Supplier Profile
router.post('/', async (req, res) => {
  try {
    const { id, name, phone } = req.body;
    await Supplier.findOneAndUpdate(
      { id }, 
      { name, phone }, 
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Supplier Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Suppliers
router.get('/', async (req, res) => {
  try {
    const data = await Supplier.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Add Ledger Entry (Simple Payment/Debit)
router.post('/ledger', async (req, res) => {
  try {
    const { id, supplierId, supplier_id, description, amount, type, timestamp } = req.body;
    const finalSupplierId = supplier_id || supplierId;

    await SupplierLedger.findOneAndUpdate(
      { id }, 
      { supplier_id: finalSupplierId, description, amount, type, timestamp }, 
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Ledger Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Ledger History
router.get('/ledger/all', async (req, res) => {
  try {
    const data = await SupplierLedger.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Record Full Stock Purchase
// 🟢 5. Record Full Stock Purchase (Inventory + Ledger)
router.post('/purchase', async (req, res) => {
  try {
    const { id, supplierId, items, amount, description, type, paidCash, timestamp } = req.body;

    // --- NEW CODE: Update Inventory in MongoDB ---
    if (items && Array.isArray(items)) {
      for (const item of items) {
        // Only update if it's marked as stock
        if (item.isStock) {
          await Product.findOneAndUpdate(
            { name: item.name, category: item.category }, // Find product by Name & Category
            { 
              $inc: { quantity: item.qty }, // Increase Quantity
              $set: { 
                price: item.price, 
                costPrice: item.cost // Map 'cost' from frontend to 'costPrice' in DB
              } 
            },
            { upsert: true, new: true, setDefaultsOnInsert: true } // Create if doesn't exist
          );
        }
      }
    }
    // ---------------------------------------------

    // 1. Save the MAIN Purchase Entry
    await SupplierLedger.findOneAndUpdate(
      { id: id }, 
      { 
        supplier_id: supplierId, 
        description: description || `Purchased ${items ? items.length : 0} items`, 
        amount: amount, 
        type: type || 'PURCHASE', 
        timestamp: timestamp 
      },
      { upsert: true, new: true }
    );

    // 2. If Paid Cash immediately, save the PAYMENT Entry
    if (paidCash) {
      const payId = `pay-${timestamp}`; 
      await SupplierLedger.findOneAndUpdate(
        { id: payId },
        { 
          supplier_id: supplierId, 
          description: 'Cash Paid on Purchase', 
          amount: amount, 
          type: 'PAYMENT', 
          timestamp: timestamp + 1 
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Purchase Sync Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 6. Delete Supplier Route (THE FIX)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(`Server: Deleting supplier ${id}`);

    const result = await Supplier.deleteOne({ id: id }); 
    await SupplierLedger.deleteMany({ supplier_id: id });

    if (result.deletedCount > 0) {
      res.json({ message: "Supplier deleted successfully" });
    } else {
      res.status(404).json({ message: "Supplier not found" });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;