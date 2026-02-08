import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/tasks';

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [tasks, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
      setError(null);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}`, {
        completed: !currentStatus
      });
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}`, updates);
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p>Stay organized and manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}
        
        <TaskForm onAddTask={handleAddTask} />
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
