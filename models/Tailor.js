// const mongoose = require('mongoose');

// const TailorSchema = new mongoose.Schema({
//   name: String,
//   phone: String
// });

// module.exports = mongoose.model('Tailor', TailorSchema);

const mongoose = require('mongoose');

const TailorSchema = new mongoose.Schema({
  // 1. Explicitly define _id as String to match mobile app UUIDs
  _id: { type: String, required: true },

  name: { type: String, required: true },
  phone: String
}, { 
  // 2. Disable auto-generation of _id (we provide it)
  _id: false, 
  
  // 3. Helper to convert _id back to 'id' for the frontend
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Tailor', TailorSchema);