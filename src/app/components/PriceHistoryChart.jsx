import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { formatValue } from '../utils/shortenValues';

const PriceHistoryChart = ({ priceHistory }) => {
  const chartData = {
    labels: priceHistory.map((entry) => {
      const date = new Date(entry.recorded_at);
      const hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours} ${ampm}`;
    }),
    datasets: [
      {
        label: 'Price',
        data: priceHistory.map((entry) => entry.price),
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Price History Chart</h2>
        <div className="w-full h-96">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;