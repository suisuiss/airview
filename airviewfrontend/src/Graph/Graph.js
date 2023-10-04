import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Graph = () => {
  const mockupData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'AQI',
        data: [40, 45, 50, 42, 48],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };
  const chartOptions = {
    maintainAspectRatio: false, // Set this to false to allow the chart to expand to the container size
  };

  return (
    <div style={{ width: '90%', height: '90%' }}> {/* Set width and height to 100% */}
      <Line data={mockupData} options={chartOptions} />
    </div>
  );
};

export default Graph;