// src/controllers/roleController.js
const RoleService = require('../services/roleService');

class RoleController {
  static async createRole(req, res) {
    try {
      const { name } = req.body;
      const roleId = await RoleService.createRole(name);
      res.status(201).json({ message: 'Role created', roleId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getRoles(req, res) {
    try {
      const roles = await RoleService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await RoleService.getRoleById(id);
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = RoleController;