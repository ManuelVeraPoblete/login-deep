// src/models/roleModel.js
const db = require('../config/db');

class Role {
  static async create({ name }) {
    const [result] = await db.execute(
      'INSERT INTO roles (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM roles');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM roles WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Role;