// src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const emailService = require('./emailService');

class AuthService {
  static async register({ name, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create({ name, email, password: hashedPassword, role });
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await emailService.sendConfirmationEmail(email, token);
    return userId;
  }

  static async confirmEmail(token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    await User.confirmEmail(userId);
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    if (!user.confirmed) {
      throw new Error('Please confirm your email');
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = AuthService;