"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PriceHistoryChart from '../components/PriceHistoryChart';

const PriceHistoryPage = () => {
  const [ids, setId] = useState(null);
  const [shs, setSh] = useState(null);
  const [pts, setPt] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-200">Price History</h1>
        <Link href="/">
          <button className="px-4 py-2 bg-bright text-gray-300 rounded-lg shadow-md hover:bg-dk focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Back to Search
          </button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PriceHistoryContent
          ids={ids}
          setId={setId}
          shs={shs}
          setSh={setSh}
          pts={pts}
          setPt={setPt}
          priceHistory={priceHistory}
          setPriceHistory={setPriceHistory}
        />
      </Suspense>
    </div>
  );
};

const PriceHistoryContent = ({
  ids,
  setId,
  shs,
  setSh,
  pts,
  setPt,
  priceHistory,
  setPriceHistory,
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    const sh = searchParams.get('sh');
    const pt = searchParams.get('pt');
    setId(id);
    setSh(sh === 'true' ? 'true' : 'false');
    setPt(pt !== null ? parseInt(pt, 10) : 0);
  }, [searchParams, setId, setSh, setPt]);

  useEffect(() => {
    // Fetch the price history data based on the pet ID, sh, and pt
    const fetchPriceHistory = async () => {
      try {
        const response = await fetch(`/api/price-history?id=${ids}&sh=${shs}&pt=${pts}`);
        const data = await response.json();
        setPriceHistory(data);
      } catch (error) {
        console.error('Error fetching price history:', error);
      }
    };

    if (ids && shs !== null && pts !== null) {
      fetchPriceHistory();
    }
  }, [ids, shs, pts, setPriceHistory]);

  return (
    <>
      <div className="bg-bright rounded-lg shadow-md p-6 mb-8 text-gray-200">
        <p className="text-lg font-bold mb-2">Pet ID: {ids}</p>
        <p className="text-lg mb-2">SH: {shs}</p>
        <p className="text-lg mb-2">PT: {pts}</p>
      </div>
      <PriceHistoryChart priceHistory={priceHistory} className="bg-bright"/>
    </>
  );
};

export default PriceHistoryPage;