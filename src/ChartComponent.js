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
      const times = data.map(entry => entry.Time); // Assuming entry.Time is in numerical format
      const signups = data.map(entry => entry.Signups);
      const concurrency = data.map(entry => entry.Concurrency);
  
      const ctx = document.getElementById('lineChart').getContext('2d');
  
      if (!window.lineChart || !window.lineChart.data) {
  
        window.lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: times.map(time => formatTime(time)), // Convert numerical time to formatted time
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
            ],
          },
          options: { 
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time'
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  maxRotation: 0, 
                  minRotation: 0 
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'No of users'
                },
                beginAtZero: true,
                position: 'left',
              },
              y1: {
                title: {
                  display: true,
                  text: 'No of users'
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
  
  // console.log("Hours:", hours);
  // console.log("Minutes:", minutes);
  // console.log("Seconds:", seconds);
  
  // Returning hours, minutes, and seconds
  return `${hours}:${minutes}:${seconds}`;
};

  return (
    <div
      style={{
      // width: '717.71px',
      // height: '233.33px',
      // position: 'absolute',
      // top: '248px',
      // left: '201px',
      // borderRadius: '11.67px',
      //background: '#F7F9FB',
      //textAlign: 'center', 
      //paddingTop: '20px' 
    }}>
      <h3>Data For Summary Report</h3>
      
      <canvas id="lineChart" width="800" height="400"></canvas>
    </div>
  );
};

export default LineGraph;