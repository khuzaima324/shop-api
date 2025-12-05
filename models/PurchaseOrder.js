const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
  // Unique ID for the entire purchase session
  purchase_id: { type: String, required: true, unique: true }, 
  supplier_id: { type: String, required: true },
  timestamp: { type: Number, required: true },
  
  // Array of items bought in this session
  items: [{
    name: String,
    category: String,
    qty: Number,
    cost: Number,
    price: Number, // Selling Price (for reference)
  }],

  totalAmount: { type: Number },
  paidCash: { type: Boolean, default: false } // Was the bill settled immediately?
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);