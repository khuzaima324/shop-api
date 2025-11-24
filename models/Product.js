// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, enum: ['cosmetics', 'zari', 'machine'], required: true },
//   price: Number,
//   costPrice: Number,
//   quantity: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('Product', ProductSchema);

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // 1. Explicitly define _id as String to match mobile app UUIDs
  _id: { type: String, required: true },

  name: { type: String, required: true },
  category: { type: String, enum: ['cosmetics', 'zari', 'machine'], required: true },
  price: Number,
  costPrice: Number,
  quantity: { type: Number, default: 0 }
}, { 
  // 2. Disable auto-generation of _id
  _id: false, 
  timestamps: true,
  
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

module.exports = mongoose.model('Product', ProductSchema);