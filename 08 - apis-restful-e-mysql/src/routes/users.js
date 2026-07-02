const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { validateCreate, validateUpdate } = require('../validators/userValidator');

// List users with pagination and optional name filter
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const name = req.query.name;
    const result = await userModel.getAll({ page, limit, name });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar usuários', error: err.message });
  }
});

// Create user
router.post('/', validateCreate, async (req, res) => {
  try {
    const user = req.body;
    const created = await userModel.create(user);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
});

// Update user by ID
router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const id = req.params.id;
    const exists = await userModel.getById(id);
    if (!exists) return res.status(404).json({ message: 'Usuário não encontrado' });
    const updated = await userModel.updateById(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const exists = await userModel.getById(id);
    if (!exists) return res.status(404).json({ message: 'Usuário não encontrado' });
    await userModel.removeById(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: err.message });
  }
});

module.exports = router;
