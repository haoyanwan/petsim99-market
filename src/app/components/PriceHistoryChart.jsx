import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
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
    <div className="mb-4">
      
      <label className="mr-2">
        <input
          type="radio"
          value={4}
          checked={selectedFrequency === 4}
          onChange={() => handleFrequencyChange(4)}
        />
        4 hours
      </label>
      <label className="mr-2">
        <input
          type="radio"
          value={8}
          checked={selectedFrequency === 8}
          onChange={() => handleFrequencyChange(8)}
        />
        8 hours
      </label>
      <label>
        <input
          type="radio"
          value={12}
          checked={selectedFrequency === 12}
          onChange={() => handleFrequencyChange(12)}
        />
        12 hours
      </label>
    </div>
  );
};

const PriceHistoryChart = ({ priceHistory }) => {
    const [frequency, setFrequency] = useState(1);
  
    const filteredPriceHistory = priceHistory
      .filter((_, index) => index % frequency === 0)
      .reverse();
  
    const chartData = {
      labels: filteredPriceHistory.map((entry) => {
        const date = new Date(entry.recorded_at);
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours} ${ampm}`;
      }),
      datasets: [
        {
          label: 'Price',
          data: filteredPriceHistory.map((entry) => entry.price),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: 'white',
          pointHoverBackgroundColor: 'white',
          pointHoverBorderColor: 'rgb(75, 192, 192)',
        },
      ],
    };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `Price: ${formatValue(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatValue(value),
        },
      },
    },
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Price History Chart</h2>
        <FrequencySelector onFrequencyChange={handleFrequencyChange} />
        <div className="w-full h-96">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;