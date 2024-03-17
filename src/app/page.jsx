"use client";
// App.jsx
import React from "react";
import PetPanel from "./components/PetPanel";
import SearchBar from "./components/SearchBar";
import {formatName} from "./utils/petNames";

import { useEffect, useState } from "react";

const App = () => {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const price_response = await fetch("/api/prices", { method: "GET" });
        const data = await price_response.json();
        setPrices(data.data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value, checked) => {
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((filter) => filter !== value));
    }
  };

  const filteredPets = prices.filter((pet) => {
    const ids = formatName(pet.configData.id, pet.configData.pt, pet.configData.sh);
    const searchMatch = ids.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = filters.every((filter) => {
      const petName = ids.toLowerCase();
      return petName.includes(filter.toLowerCase());
    });
    return searchMatch && filterMatch;
  });

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Pet List</h1>
      <div className="mb-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>
      <PetPanel pets={filteredPets} />
    </div>
  );
};

export default App;