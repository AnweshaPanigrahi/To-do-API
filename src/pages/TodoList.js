
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/todos');
      setTodos(res.data);
    } catch (err) {
      setError('Failed to load todos.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post('/todos', { task });
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      setError('Error adding todo.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Error deleting todo.');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.put(`/todos/${id}`, { completed: !completed });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      setError('Error updating todo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={handleLogout} style={{ background: 'gray', color: 'white', padding: '6px 12px', border: 'none' }}>
          Logout
        </button>
      </div>

      <h2>Todo List</h2>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          placeholder="New Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ flexGrow: 1, padding: '10px' }}
        />
        <button onClick={handleAdd} style={{ padding: '10px 20px', marginLeft: '10px', background: 'green', color: 'white' }}>
          Add
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: '10px' }}>
            <span
              onClick={() => handleToggle(todo._id, todo.completed)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {todo.task}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
