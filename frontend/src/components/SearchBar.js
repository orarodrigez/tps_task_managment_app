import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search tasks by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="clear-button"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
