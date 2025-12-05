const mongoose = require('mongoose');

const SupplierLedgerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  supplier_id: { type: String, required: true },
  description: { type: String },
  amount: { type: Number },
  type: { type: String }, // 'PURCHASE' or 'PAYMENT'
  timestamp: { type: Number }
});

module.exports = mongoose.model('SupplierLedger', SupplierLedgerSchema);