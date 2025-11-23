require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ensure you created the models folder earlier!

// --- YOUR INVENTORY DATA GOES HERE ---
const products = [
  // Format: { name: "Item Name", category: "cosmetics", price: SalePrice, costPrice: BuyPrice, quantity: Qty }
  
  // Cosmetics
  { name: "Lipstick Red (Matte)", category: "cosmetics", price: 500, costPrice: 350, quantity: 20 },
  { name: "Eyeliner Black", category: "cosmetics", price: 250, costPrice: 150, quantity: 50 },
  { name: "Foundation Base", category: "cosmetics", price: 800, costPrice: 600, quantity: 10 },
  { name: "Face Powder", category: "cosmetics", price: 400, costPrice: 250, quantity: 15 },
  
  // Zari
  { name: "Gold Lace (1 yard)", category: "zari", price: 100, costPrice: 60, quantity: 100 },
  { name: "Silver Thread", category: "zari", price: 50, costPrice: 30, quantity: 200 },
  { name: "Fancy Buttons (Doz)", category: "zari", price: 120, costPrice: 80, quantity: 50 },

  // Machine Services (Quantity is just a placeholder)
  { name: "Overlock", category: "machine", price: 50, costPrice: 5, quantity: 9999 },
  { name: "Pico", category: "machine", price: 60, costPrice: 5, quantity: 9999 },
  { name: "Kaj Button", category: "machine", price: 30, costPrice: 2, quantity: 9999 },
];

// --- THE UPLOAD SCRIPT ---
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB...");
    
    console.log("🗑️  Clearing old products...");
    await Product.deleteMany({}); 

    console.log(`📤 Uploading ${products.length} items...`);
    await Product.insertMany(products);

    console.log("🎉 Success! Inventory Imported.");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });