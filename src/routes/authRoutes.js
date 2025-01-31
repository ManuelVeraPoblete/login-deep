// src/routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/register', AuthController.register);
router.get('/confirm-email', AuthController.confirmEmail);
router.post('/login', AuthController.login);

module.exports = router;