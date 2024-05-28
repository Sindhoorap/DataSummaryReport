import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({selectedTestDetail}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedTestDetail]);

  const renderChart = useCallback(() => {
    if (data.length > 0) {
      const times = data.map(entry => entry.Time); // Assuming entry.Time is in string format like "00:00"
      const signups = data.map(entry => entry.Signups);
      const concurrency = data.map(entry => entry.Concurrency);
      const liveSuccess = data.map(entry => entry["Live Success"]); // Accessing "Live Success" correctly

      const ctx = document.getElementById('lineChart').getContext('2d');

      if (!window.lineChart || !window.lineChart.data) {
        window.lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: times.map(time => formatTime(time)), // Convert time to formatted time
            datasets: [
              {
                label: 'Signups',
                data: signups,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1.5,
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                yAxisID: 'y1',
                pointRadius: 0,
              },
              {
                label: 'Concurrency',
                data: concurrency,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1.5,
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                yAxisID: 'y',
                pointRadius: 0,
              },
              {
                label: 'Play',
                data: liveSuccess,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1.5,
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                yAxisID: 'y1',
                pointRadius: 0,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time',
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  maxRotation: 0,
                  minRotation: 0,
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'No of users',
                },
                beginAtZero: true,
                position: 'left',
              },
              y1: {
                title: {
                  display: true,
                  text: 'No of users',
                },
                grid: {
                  drawOnChartArea: false,
                },
                beginAtZero: true,
                position: 'right',
              },
            },
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
          },
        });
      } else {
        window.lineChart.data.labels = times.map(time => formatTime(time));
        window.lineChart.data.datasets[0].data = signups;
        window.lineChart.data.datasets[1].data = concurrency;
        window.lineChart.data.datasets[2].data = liveSuccess;
        window.lineChart.options.scales.x.title.text = 'Time';
        window.lineChart.update();
      }
    }
  }, [data]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  // Function to format time values to time format
  const formatTime = (time) => {
    console.log("Original time:", time);

    // Extracting hours, minutes, and seconds from the time string
    const [hours, minutes, seconds] = time.split(":");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="chart-container">
      <canvas id="lineChart" style={{ width: '100%', height: '100%' }} ></canvas>
    </div>
  );
};

export default LineGraph;
