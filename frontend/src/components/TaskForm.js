import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTask({
        title: title.trim(),
        description: description.trim()
      });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          className="form-textarea"
          rows="3"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="form-button"
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
