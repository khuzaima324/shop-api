const mongoose = require('mongoose');

const LedgerSchema = new mongoose.Schema({
  tailor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tailor' },
  description: String,
  amount: Number,
  type: { type: String, enum: ['DEBIT', 'CREDIT'] },
  timestamp: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Ledger', LedgerSchema);