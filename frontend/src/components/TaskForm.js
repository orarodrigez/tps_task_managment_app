import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask, onCancel, editingTask }) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!editingTask;

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
        description: description.trim(),
        dueDate: dueDate || null
      });
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
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
          rows="4"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate" className="form-label">Due Date (Optional)</label>
        <input
          id="dueDate"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isSubmitting}
          className="form-input"
        />
      </div>
      <div className="form-buttons">
        <button
          type="submit"
          disabled={isSubmitting}
          className="form-button submit-button"
        >
          {isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Task' : 'Add Task')}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="form-button cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
