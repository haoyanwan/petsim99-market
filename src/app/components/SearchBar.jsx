// SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
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
  );
};

export default SearchBar;