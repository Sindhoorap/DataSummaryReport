import React, { useState, useEffect, useCallback, useRef } from 'react';
import Chart from 'chart.js/auto';

const formatTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");
  return `${hours}:${minutes}:${seconds}`;
};

const getChartConfig = (times, signups, concurrency, liveSuccess) => ({
  type: 'line',
  data: {
    labels: times.map(time => formatTime(time)),
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
    responsive: true,
    maintainAspectRatio: false,
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
        grid: {
          drawOnChartArea: false,
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

const LineGraph = ({ selectedTestDetail }) => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedTestDetail]);

  const renderChart = useCallback(() => {
    if (data.length > 0 && chartRef.current) {
      const times = data.map(entry => entry.Time);
      const signups = data.map(entry => entry.Signups);
      const concurrency = data.map(entry => entry.Concurrency);
      const liveSuccess = data.map(entry => entry["Live Success"]);

      const ctx = chartRef.current.getContext('2d');
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, getChartConfig(times, signups, concurrency, liveSuccess));
    }
  }, [data]);

  useEffect(() => {
    renderChart();
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [renderChart]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} id="lineChart" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default LineGraph;
