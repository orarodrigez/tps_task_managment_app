import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggleComplete, onUpdateTask, onEditTask, onDeleteTask, searchTerm, onSearchChange, onSort, sortColumn, sortDirection }) {
 

  
   if (tasks.length === 0 && searchTerm.trim() === '') {
    return (
      <div className="empty-state">
        <p> No tasks yet. Create one to get started!</p>
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

      <div className="task-table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th className="col-done" onClick={() => onSort('completed')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Done {sortColumn === 'completed' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-title" onClick={() => onSort('title')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Title {sortColumn === 'title' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-description" onClick={() => onSort('description')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Description {sortColumn === 'description' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-due" onClick={() => onSort('dueDate')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Due Date {sortColumn === 'dueDate' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-created" onClick={() => onSort('createdAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Created {sortColumn === 'createdAt' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-updated" onClick={() => onSort('updatedAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Updated {sortColumn === 'updatedAt' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-completed" onClick={() => onSort('completedAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Completed {sortColumn === 'completedAt' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="col-actions">Actions</th>
            </tr>
            <tr className="filter-row">
              <td className="col-done"></td>
              <td className="col-title">
                <input 
                  type="text"
                  className="filter-input"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </td>
              <td className="col-description"></td>
              <td className="col-due"></td>
              <td className="col-created"></td>
              <td className="col-updated"></td>
              <td className="col-completed"></td>
              <td className="col-actions"></td>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
