import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const API_URL = 'http://localhost:5000/api/tasks';

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchTerm.trim() !== '') {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) aValue = '';
        if (bValue === null || bValue === undefined) bValue = '';

        // Case-insensitive string comparison
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        // Compare values
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredTasks(result);
  }, [tasks, searchTerm, sortColumn, sortDirection]);

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
      let response;
      if (editingTask) {
        response = await axios.put(`${API_URL}/${editingTask.id}`, taskData);
        setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      } else {
        response = await axios.post(API_URL, taskData);
        setTasks([response.data, ...tasks]);
      }
      setError(null);
      handleCloseModal();
    } catch (err) {
      setError(editingTask ? 'Failed to update task' : 'Failed to create task');
      console.error(err);
    }
  };

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle direction if clicking same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column to sort by
      setSortColumn(column);
      setSortDirection('asc');
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

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${taskId}`);
        setTasks(tasks.filter(task => task.id !== taskId));
        setError(null);
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
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
        
        <div className="add-task-button-container">
          <button className="add-task-button" onClick={handleOpenAddModal}>
            + Add New Task
          </button>
        </div>
        
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
              <TaskForm 
                onAddTask={handleAddTask}
                onCancel={handleCloseModal}
                editingTask={editingTask}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
            onEditTask={handleOpenEditModal}
            onDeleteTask={handleDeleteTask}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        )}
      </main>
    </div>
  );
}

export default App;
