// SearchBar.jsx
import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearch, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState(['Huge']);

  useEffect(() => {
    onFilterChange('Huge', true);
  }, []);

  const handleFilterChange = (value) => {
    const isActive = activeFilters.includes(value);
    if (isActive) {
      setActiveFilters(activeFilters.filter((filter) => filter !== value));
      onFilterChange(value, false);
    } else {
      setActiveFilters([...activeFilters, value]);
      onFilterChange(value, true);
    }
  };

  return (
    
    <div>
      <div className="SearchBar w-96 px-3.5 py-3 bg-gray-900 rounded-lg flex items-center gap-4">
        <div className="Search justify-start items-center gap-1 flex">
          <div className="Rectangle2 w-0.5 h-5 bg-amber-500 rounded" />
          <input
            type="text"
            className="SearchOrType text-gray-500 text-base font-medium font-['DM Sans'] bg-transparent focus:outline-none"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className={`ml-2 text-gray-400 font-bold rounded-full py-1 px-3 cursor-pointer ${
            activeFilters.includes('Huge')
              ? 'bg-gray-800 text-white'
              : 'bg-dk-light text-gray-500 hover:bg-gray-800 hover:text-white'
          }`}
          onClick={() => handleFilterChange('Huge')}
        >
          Huge
        </button>
        <button
          className={`ml-2 text-gray-400 font-bold rounded-full py-1 px-3 cursor-pointer ${
            activeFilters.includes('Golden')
              ? 'bg-gray-800 text-white'
              : 'bg-dk-light text-gray-500 hover:bg-gray-800 hover:text-white'
          }`}
          onClick={() => handleFilterChange('Golden')}
        >
          Golden
        </button>
        <button
          className={`ml-2 text-gray-400 font-bold rounded-full py-1 px-3 cursor-pointer ${
            activeFilters.includes('Rainbow')
              ? 'bg-gray-800 text-white'
              : 'bg-dk-light text-gray-500 hover:bg-gray-800 hover:text-white'
          }`}
          onClick={() => handleFilterChange('Rainbow')}
        >
          Rainbow
        </button>
        <button
          className={`ml-2 text-gray-400 font-bold rounded-full py-1 px-3 cursor-pointer ${
            activeFilters.includes('Shiny')
              ? 'bg-gray-800 text-white'
              : 'bg-dk-light text-gray-500 hover:bg-gray-800 hover:text-white'
          }`}
          onClick={() => handleFilterChange('Shiny')}
        >
          Shiny
        </button>
      </div>
    </div>
  );
};

export default SearchBar;