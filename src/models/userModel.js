// src/models/userModel.js
const db = require('../config/db');

class User {
  static async create({ name, email, password, role }) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async confirmEmail(userId) {
    await db.execute('UPDATE users SET confirmed = 1 WHERE id = ?', [userId]);
  }
}

module.exports = User;