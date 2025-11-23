const mongoose = require('mongoose');

const TailorSchema = new mongoose.Schema({
  name: String,
  phone: String
});

module.exports = mongoose.model('Tailor', TailorSchema);