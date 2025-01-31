// src/services/roleService.js
const Role = require('../models/roleModel');

class RoleService {
  static async createRole(name) {
    return await Role.create({ name });
  }

  static async getRoles() {
    return await Role.findAll();
  }

  static async getRoleById(id) {
    return await Role.findById(id);
  }
}

module.exports = RoleService;