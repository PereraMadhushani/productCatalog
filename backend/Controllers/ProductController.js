const db = require("../Config/db");

// Get all products
exports.getProducts = (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Add a new product with an image
exports.addProductWithImage = (req, res) => {
  const { name, price, description,category,rating } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const query = "INSERT INTO products (name, description,category,rating,  price,image) VALUES (?, ?, ?, ?)";
  db.query(query, [name,description, price, category,rating, imageUrl], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Product added successfully!" });
  });
};
