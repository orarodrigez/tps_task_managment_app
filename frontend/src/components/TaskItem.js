import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggleComplete, onUpdateTask, onEditTask, onDeleteTask }) {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <tr className={`task-row ${task.completed ? 'completed' : ''}`}>
      <td className="col-done">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, task.completed)}
          className="task-checkbox"
        />
      </td>
      <td className="col-title">
        <span className="task-title">{task.title}</span>
      </td>
      <td className="col-description">
        <span className="task-description">{task.description || '—'}</span>
      </td>
      <td className="col-due">
        <span className="task-date">{task.dueDate ? formatDateTime(task.dueDate) : '—'}</span>
      </td>
      <td className="col-created">
        <span className="task-date">{formatDateTime(task.createdAt)}</span>
      </td>
      <td className="col-updated">
        <span className="task-date">{formatDateTime(task.updatedAt)}</span>
      </td>
      <td className="col-completed">
        <span className="task-date">{task.completed && task.completedAt ? formatDateTime(task.completedAt) : '—'}</span>
      </td>
      <td className="col-actions">
        <button
          onClick={() => onEditTask(task)}
          className="edit-button"
          title="Edit task"
        >
          ✎
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="delete-button"
          title="Delete task"
        >
          🗑
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
