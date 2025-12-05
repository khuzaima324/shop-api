const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model('Supplier', SupplierSchema);