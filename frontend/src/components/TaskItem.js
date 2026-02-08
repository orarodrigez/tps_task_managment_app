import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggleComplete, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSaveEdit = () => {
    if (editTitle.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }
    onUpdateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-textarea"
            placeholder="Task description"
            rows="2"
          />
          <div className="edit-buttons">
            <button onClick={handleSaveEdit} className="save-button">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id, task.completed)}
        className="task-checkbox"
      />
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="edit-button"
        title="Edit task"
      >
        ✎
      </button>
    </div>
  );
}

export default TaskItem;
