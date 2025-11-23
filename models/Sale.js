const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  amount: Number,
  costPrice: Number,
  category: { type: String, enum: ['cosmetics', 'zari', 'machine'] },
  note: String,
  quantity: Number,
  timestamp: { type: Number, default: Date.now } // Store Unix timestamp to match your App logic
});

module.exports = mongoose.model('Sale', SaleSchema);