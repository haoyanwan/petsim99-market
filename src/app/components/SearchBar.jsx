// SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearch, onFilterChange }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value, event.target.checked);
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:shadow-outline"
          placeholder="Search pets..."
          value={searchTerm}
          onChange={onSearch}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            value="Huge"
            onChange={handleFilterChange}
          />
          <span className="ml-2 text-gray-700">Huge</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            value="Golden"
            onChange={handleFilterChange}
          />
          <span className="ml-2 text-gray-700">Golden</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            value="Rainbow"
            onChange={handleFilterChange}
          />
          <span className="ml-2 text-gray-700">Rainbow</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            value="Shiny"
            onChange={handleFilterChange}
          />
          <span className="ml-2 text-gray-700">Shiny</span>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;