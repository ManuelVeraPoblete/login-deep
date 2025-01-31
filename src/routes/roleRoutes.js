// src/routes/roleRoutes.js
const express = require('express');
const RoleController = require('../controllers/roleController');

const router = express.Router();

router.post('/roles', RoleController.createRole);
router.get('/roles', RoleController.getRoles);
router.get('/roles/:id', RoleController.getRoleById);

module.exports = router;