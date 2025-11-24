// const mongoose = require('mongoose');

// const SaleSchema = new mongoose.Schema({
//   amount: Number,
//   costPrice: { type: Number, default: 0, required: false },
//   category: { type: String, enum: ['cosmetics', 'zari', 'machine'] },
//   note: { type: String, default: '', required: false },
//   quantity: { type: Number, default: 1, required: false },
//   timestamp: { type: Number, default: Date.now } // Store Unix timestamp to match your App logic
// });

// module.exports = mongoose.model('Sale', SaleSchema);
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  // 1. Explicitly define _id as a String to accept your mobile app's UUIDs
  _id: { type: String, required: true }, 

  amount: { type: Number, required: true },
  costPrice: { type: Number, default: 0 },
  category: { type: String, enum: ['cosmetics', 'zari', 'machine'], required: true },
  note: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  
  // 2. Ensure timestamp is a Number (Unix timestamp from app), not a Date object
  timestamp: { type: Number, required: true } 
}, { 
  // 3. Disable auto-id generation (since we provide it)
  _id: false, 
  
  // 4. Helper to convert _id back to 'id' when sending data back to the app
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Sale', SaleSchema);