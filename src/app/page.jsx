"use client";
// App.jsx
import React, { use } from "react";
import PetPanel from "./components/PetPanel";
import SearchBar from "./components/SearchBar";
import { formatName } from "./utils/petNames";
import { useEffect, useState } from "react";

const App = () => {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);

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

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setFavoritePets(favorites);
    }
  }, [filters]);




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
      if (filter === 'Favorite') {
        return true;
      }
      const petName = ids.toLowerCase();
      return petName.includes(filter.toLowerCase());
    });
    const isFavorite = filters.includes('Favorite') ? favoritePets.includes(ids) : true;
    return searchMatch && filterMatch && isFavorite;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-between bg-bright p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-10">
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
      <PetPanel pets={filteredPets}/>
    </div>
  );
};

export default App;