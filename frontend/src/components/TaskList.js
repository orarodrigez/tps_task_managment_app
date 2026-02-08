import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggleComplete, onUpdateTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="task-list-container">
      <div className="task-stats">
        <h3>Progress: {completedCount} of {tasks.length} completed ({progressPercentage}%)</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
