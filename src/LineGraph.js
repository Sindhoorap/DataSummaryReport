import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderChart = useCallback(() => {
    if (data.length > 0) {
      const times = data.map(entry => entry.Time);
      const signups = data.map(entry => entry.Signups);
      const concurrency = data.map(entry => entry.Concurrency);

      const ctx = document.getElementById('lineChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: times,
          datasets: [
            {
              label: 'Signups',
              data: signups,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              yAxisID : 'y1',
            },
            {
              label: 'Concurrency',
              data: concurrency,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID : 'y',
            },
          ],
        },
        options: {
          scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (min)'
                },
                // grid: {
                //     display: false // Remove vertical grid lines
                // }
            },
            y: {
                title: {
                    display: true,
                    text: 'No of users'
                },
                // border:{
                //     display:false
                //   },
                
                beginAtZero: true,
                position: 'left',
            },
            y1: {
                title: {
                    display: true,
                    text: 'No of users'
                },
                grid:{
                    drawOnChartArea: false,
                },
                // border:{
                //     display:false
                //   },
                
                beginAtZero: true,
                position: 'right',
                
            },
            
        },
        },
      });
    }
  }, [data]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  return (
    <div>
      <h2>Line Graph</h2>
      <canvas id="lineChart" width="800" height="400"></canvas>
    </div>
  );
};

export default LineGraph;
