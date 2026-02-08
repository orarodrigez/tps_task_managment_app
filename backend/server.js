const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const Database = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
const db = new Database();
db.initialize();

// Routes

// GET /api/tasks - Retrieve all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await db.createTask({
      title,
      description: description || ''
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id - Update an existing task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await db.updateTask(id, {
      title,
      description,
      completed
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
