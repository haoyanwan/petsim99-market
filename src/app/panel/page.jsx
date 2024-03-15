"use client";
// App.jsx
import React from "react";
import PetPanel from "../components/PetPanel";
import SearchBar from "../components/SearchBar";

import { useEffect, useState } from "react";

const App = () => {
  // make a call to the api/prices endpoint to get the prices

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // get the body of the response
        const price_response = await fetch("/api/prices", { method: "GET" });
        // parse the body of the response as JSON
        const data = await price_response.json();
        setPrices(data.data);
        
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const petsData = [
    { category: "Pet", configData: { id: "Happy Rock", pt: 1 }, value: 105 },
    { category: "Pet", configData: { id: "Nightfall Ram" }, value: 7532802 },
    // ...
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPets = prices.filter((pet) =>
    pet.configData.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Pet List</h1>
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <PetPanel pets={filteredPets} />
    </div>
  );
};

export default App;
