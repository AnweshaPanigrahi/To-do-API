const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title, user: req.user.id });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
