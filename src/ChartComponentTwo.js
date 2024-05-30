import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const labels = Array.from({ length: 12 }, (_, i) => i * 2);

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Target',
            backgroundColor: 'rgb(60, 179, 113)', // green
            borderColor: 'rgba(0, 100, 0, 0.2)',
            borderWidth: 1.5,
            hoverBackgroundColor: 'rgba(0, 100, 0, 0.2)',
            hoverBorderColor: 'rgba(0, 100, 0, 0.2)',
            data: [0, 10, 20, 35, 40, 55, 70, 75, 89, 94, 98, 100, 100],
        },
        {
            label: 'Achieved',
            backgroundColor: 'rgba(255, 99, 75)', // Red
            borderColor: 'rgba(255, 0, 0, 0.2)',
            borderWidth: 1.5,
            hoverBackgroundColor: 'rgba(255, 0, 0, 0.2)',
            hoverBorderColor: 'rgba(255, 0, 0, 0.2)',
            data: [0, 5, 10, 25, 32, 44, 55, 60, 75, 89, 99, 90, 100],
        },
    ],
};

const chartConfig = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Olympic - Profile 1'
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (min)'
                },
                grid: {
                    display: false // Remove vertical grid lines
                }
            },
            y: {
                title: {
                    display: true,
                    text: '% of peak'
                },
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    let datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
                    let label = data.labels[tooltipItem.index];
                    let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return datasetLabel + ': ' + value + '% (' + label + ')';
                }
            }
        }
    }
}
    
    function ChartComponentTwo() {
        const chartRef = useRef(null);
    
        useEffect(() => {
            if (chartRef.current) {
                const ctx = chartRef.current.getContext('2d');
                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }
                chartRef.current.chart = new Chart(ctx, chartConfig);
            }
        }, []);
    
        return (
            <div className="chart-container">
                <canvas ref={chartRef} id="lineChart" style={{ width: '0%', height: '0%' }} ></canvas>
            </div>
        );
    }
    
    export default ChartComponentTwo;