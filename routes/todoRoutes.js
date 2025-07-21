const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // assuming your model is here

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add todo
router.post('/', async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.status(201).json(todo);
});

// Update todo (toggle completed)
router.put('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(todo);
});

// Delete todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
