const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  amount: Number,
  costPrice: { type: Number, default: 0, required: false },
  category: { type: String, enum: ['cosmetics', 'zari', 'machine'] },
  note: { type: String, default: '', required: false },
  quantity: { type: Number, default: 1, required: false },
  timestamp: { type: Number, default: Date.now } // Store Unix timestamp to match your App logic
});

module.exports = mongoose.model('Sale', SaleSchema);