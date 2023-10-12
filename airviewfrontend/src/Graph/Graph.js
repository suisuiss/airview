import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { DateTime } from 'luxon';  // Import DateTime

import 'chartjs-adapter-luxon';  // Import the Luxon date adapter

const Graph = () => {
  const [chartData, setChartData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Make an API request to fetch AQI data
    fetch('http://localhost:4000/aqiChart') // Update with your backend API endpoint
      .then((response) => response.json())
      .then((aqiData) => {
        // Process the data and format it for Chart.js
        const last60DaysData = aqiData
          .slice(0, 60)  // Get data for the last 60 days
          .map((entry) => ({
            x: DateTime.fromISO(entry.date),  // Convert dates to Luxon DateTime objects
            y: entry.AQI,
          }));

        const chartDataReal = {
          datasets: [
            {
              label: 'AQI',
              data: last60DaysData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
            },
          ],
        };

        setChartData(chartDataReal);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching AQI data:', error);
      });
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '90%', height: '90%' }}>
      {dataLoaded ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Graph;