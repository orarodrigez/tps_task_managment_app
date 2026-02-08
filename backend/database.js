const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class Database {
  constructor() {
    const dbPath = path.join(__dirname, 'tasks.db');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to SQLite database');
      }
    });
  }

  initialize() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          completed INTEGER DEFAULT 0,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        )
      `);
    });
  }

  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM tasks ORDER BY createdAt DESC', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const tasks = rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            completed: Boolean(row.completed),
            createdAt: row.createdAt,
            updatedAt: row.updatedAt
          }));
          resolve(tasks);
        }
      });
    });
  }

  createTask(data) {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO tasks (id, title, description, completed, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [id, data.title, data.description, 0, now, now],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id,
              title: data.title,
              description: data.description,
              completed: false,
              createdAt: now,
              updatedAt: now
            });
          }
        }
      );
    });
  }

  updateTask(id, data) {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      const updates = [];
      const params = [];

      if (data.title !== undefined) {
        updates.push('title = ?');
        params.push(data.title);
      }
      if (data.description !== undefined) {
        updates.push('description = ?');
        params.push(data.description);
      }
      if (data.completed !== undefined) {
        updates.push('completed = ?');
        params.push(data.completed ? 1 : 0);
      }

      updates.push('updatedAt = ?');
      params.push(now);
      params.push(id);

      const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
      const db = this.db;

      this.db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          // Fetch and return the updated task
          db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
            if (err) {
              reject(err);
            } else if (row) {
              resolve({
                id: row.id,
                title: row.title,
                description: row.description,
                completed: Boolean(row.completed),
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
              });
            } else {
              resolve(null);
            }
          });
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Database;
