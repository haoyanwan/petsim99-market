"use client";

import { useEffect, useState } from "react";
import PriceChart from "./components/PriceChart";

const Home = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // get the body of the response
        const response = await fetch("/api/prices", { method: "GET" });
        // parse the body of the response as JSON
        const data = await response.json();
        console.log("data", data);
        setPrices(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div>
      <h1>Game Item Price Tracker</h1>
      <PriceChart prices={prices} />
    </div>
  );
};

export default Home;
