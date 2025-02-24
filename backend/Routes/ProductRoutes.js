const express = require("express");
const multer = require("multer");
const { getProducts, addProduct,addProductWithImage } = require("../Controllers/ProductController");
const path = require("path");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the filename
    }
  });
  
  const upload = multer({ storage });
  

// Get all products
router.get("/", getProducts);
router.post("/", upload.single("image"), addProductWithImage); 

module.exports = router;
