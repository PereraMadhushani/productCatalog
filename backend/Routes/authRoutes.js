const express = require('express');
const { signup, signin } = require('../Controllers/authController');
const router = express.Router();

// POST /api/signup
router.post('/signup', signup);

// POST /api/signin
router.post('/signin', signin);

module.exports = router;
