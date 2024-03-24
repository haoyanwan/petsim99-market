import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { formatValue } from '../utils/shortenValues';

const FrequencySelector = ({ onFrequencyChange }) => {
  const [selectedFrequency, setSelectedFrequency] = useState(4);

  useEffect(() => {
    handleFrequencyChange(selectedFrequency);
  }, []);

  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency);
    onFrequencyChange(frequency);
  };

  return (
    <div className="mb-4 flex space-x-4">
      <button
        className={`text-white font-bold rounded-full py-1 px-3 cursor-pointer ${
          selectedFrequency === 4
            ? 'bg-gray-800 text-white'
            : 'bg-dk-light text-gray-500 hover:text-white'
        }`}
        onClick={() => handleFrequencyChange(4)}
      >
        4 hours
      </button>
      <button
        className={`text-white font-bold rounded-full py-1 px-3 cursor-pointer ${
          selectedFrequency === 8
            ? 'bg-gray-800 text-white'
            : 'bg-dk-light text-gray-500 hover:text-white'
        }`}
        onClick={() => handleFrequencyChange(8)}
      >
        8 hours
      </button>
      <button
        className={`text-white font-bold rounded-full py-1 px-3 cursor-pointer ${
          selectedFrequency === 12
            ? 'bg-gray-800 text-white'
            : 'bg-dk-light text-gray-500 hover:text-white'
        }`}
        onClick={() => handleFrequencyChange(12)}
      >
        12 hours
      </button>
    </div>
  );
};

const PriceHistoryChart = ({ priceHistory }) => {
  const [frequency, setFrequency] = useState(1);

  const filteredPriceHistory = priceHistory
    .filter((_, index) => index % frequency === 0)
    .reverse()
    .slice(-24);

  const data = filteredPriceHistory.map((entry) => ({
    date: entry.recorded_at,
    price: entry.price,
  }));

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };
// Calculate the minimum and maximum prices from the data
const maxPrice = Math.max(...data.map((entry) => entry.price));
const minPrice = Math.min(...data.map((entry) => entry.price));

// Get the current price (latest price)
const currentPrice = priceHistory[0]?.price;

  return (
    <div className="w-full">
      <div className="bg-bright text-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Price History Chart</h2>
        {currentPrice && (
          <h3 className="text-lg font-semibold mb-4">
            Current Price: {formatValue(currentPrice)}
          </h3>
        )}        
      <FrequencySelector onFrequencyChange={handleFrequencyChange} />
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5D3FD3" stopOpacity={0.8} />
                  <stop offset="75%" stopColor="#5D3FD3" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Area dataKey="price" stroke="#ffffff" strokeWidth={4} fill="url(#color)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                tickFormatter={(str, index) => {
                  const date = parseISO(str);
                  return format(date, 'MMM d');
                }}
                interval={24 / frequency - 1}
                tickMargin={10}
              />
              <YAxis
                dataKey="price"
                axisLine={false}
                tickLine={false}
                tickCount={7}
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                tickFormatter={(number, index) => {
                  if (index === 0) {
                    return '';
                  }
                  return formatValue(number);
                }}
                domain={[minPrice * 0.95, maxPrice * 1.05]}
              />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid
                opacity={0.15}
                vertical={false}
                strokeDasharray="3 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = parseISO(label);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date(date.toLocaleString('en-US', { timeZone: userTimezone }));

    //adjust offset
    const fixedDate = new Date(localDate.getTime() - 6 * 60 * 60 * 1000);

    return (
      <div className="bg-white text-bright p-4 rounded shadow-md">
        <h4 className="text-lg font-semibold mb-2">
          {format(fixedDate, 'eeee, MMM d, h:mm a')}
        </h4>
        <p className="text-base mb-2">{formatValue(payload[0].value)}</p>
     
      </div>
    );
  }
  return null;
};
export default PriceHistoryChart;