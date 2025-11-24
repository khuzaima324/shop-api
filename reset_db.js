require('dotenv').config();
const mongoose = require('mongoose');

// Import all models
const Sale = require('./models/Sale');
const Product = require('./models/Product');
const Tailor = require('./models/Tailor');
const Ledger = require('./models/Ledger');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB. Running reset...");

    // Delete everything from all collections
    await Sale.deleteMany({});
    await Product.deleteMany({});
    await Tailor.deleteMany({});
    await Ledger.deleteMany({});
    
    console.log("🗑️ All Cloud Data Cleared Successfully.");
    
    // Clear the local cache of the Node server too (optional but good)
    await mongoose.connection.db.dropCollection('sync_queue').catch(e => console.log('Queue collection already dropped or not found.'));
    
    process.exit();
  })
  .catch(err => {
    console.error("Reset Failed:", err);
    process.exit(1);
  });