const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const productRoutes = require("./Routes/ProductRoutes");
const authRoutes = require('./Routes/authRoutes');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const router = express();

// Middleware
router.use(bodyParser.json());

// Serve static files from "uploads" folder
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
router.use("/api/products", productRoutes);
router.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
router.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
