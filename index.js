// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const checkPermission = require('./middleware/auth');
// const productRoutes = require('./routes/products');
// const saleRoutes = require('./routes/sales');
// const tailorRoutes = require('./routes/tailors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // 1. Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch(err => console.error("❌ DB Connection Error:", err));

// // 2. Apply Security Guard (The 2-Key System)
// app.use(checkPermission);

// // 3. Routes
// app.use('/api/products', productRoutes);
// app.use('/api/sales', saleRoutes);
// app.use('/api/tailors', tailorRoutes);

// // 4. Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware & Existing Routes
const checkPermission = require('./middleware/auth');
const productRoutes = require('./routes/products');
const saleRoutes = require('./routes/sales');
const tailorRoutes = require('./routes/tailors');
const settingRoutes = require('./routes/settings');

// 🟢 NEW ROUTES (Importing the files you just made)
const expenseRoutes = require('./routes/expenses'); 
const supplierRoutes = require('./routes/suppliers');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// 2. Apply Security Guard (The 2-Key System)
// Note: This protects ALL routes below, including the new ones.
app.use(checkPermission);

// 3. Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/tailors', tailorRoutes);

// 🟢 CONNECT NEW ROUTES
app.use('/api/expenses', expenseRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/settings', settingRoutes);

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));