// src/controllers/authController.js
const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const userId = await AuthService.register({ name, email, password, role });
      res.status(201).json({ message: 'User registered, please confirm your email', userId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async confirmEmail(req, res) {
    try {
      const { token } = req.query;
      await AuthService.confirmEmail(token);
      res.status(200).json({ message: 'Email confirmed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;