const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['cosmetics', 'zari', 'machine'], required: true },
  price: Number,
  costPrice: Number,
  quantity: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);