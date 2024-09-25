import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import './Analytics.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement,BarElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, selectedQueues, dateRange }) => {
    const { startDate, endDate } = dateRange;
  
    const chartData = {
      labels: [],
      datasets: [],
    };
  
    // Generate date labels for the x-axis
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      chartData.labels.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // Determine which queues to display
    const queuesToDisplay = selectedQueues.length > 0 ? selectedQueues : Object.keys(data);
  
    // Generate datasets for each queue
    queuesToDisplay.forEach((queueId, index) => {
      const queueData = data[queueId];
      if (!queueData || !queueData.daily_stats) {
        console.warn(`No valid data found for queue ID: ${queueId}`);
        return;
      }
  
      const dataset = {
        label: queueData.queueName || queueData.name || `Queue ${queueId}`,
        data: chartData.labels.map(date => {
          const dayStats = queueData.daily_stats[date];
          if (!dayStats || !dayStats.guests) return 0;  // Use 0 for missing data to avoid null issues
  
          const guests = Object.values(dayStats.guests);
          const servedGuests = guests.filter(guest => guest.status === 'served' && guest.waitTime != null);
  
          if (servedGuests.length === 0) return 0;
  
          const totalWaitTime = servedGuests.reduce((sum, guest) => sum + (guest.waitTime || 0), 0);
          const averageWaitTime = totalWaitTime / servedGuests.length;
  
          return averageWaitTime;
        }),
        borderColor: `hsl(${index * 137.5}, 50%, 50%)`,
        backgroundColor: `hsla(${index * 137.5}, 50%, 50%, 0.5)`,
        fill: false,  // Ensure line chart doesn’t fill under the line
        tension: 0.4, // Smooth lines for better visuals
      };
  
      chartData.datasets.push(dataset);
    });
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Average Wait Time by Queue',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Average Wait Time (minutes)',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    };
  
    return <Line data={chartData} options={options} />;
  };
  
  
  const BarChart = ({ data, selectedQueue, dateRange }) => {
    const { startDate, endDate } = dateRange;
    const queueData = data[selectedQueue];
  
    if (!data || !selectedQueue || !data[selectedQueue]) {
      return <p>No data available for the selected queue.</p>;
    }
    if (!queueData.daily_stats) {
      return <p>No daily statistics available for the selected queue.</p>;
    }
  
    const dates = [];
    const currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    while (currentDate <= endDateObj) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    const filteredData = dates.reduce((acc, date) => {
      acc[date] = {
        served: 0,
        canceled: 0,
        waiting: 0,
      };
      const dayData = queueData.daily_stats[date];
      if (dayData && dayData.guests) {
        Object.values(dayData.guests).forEach(guest => {
          if (guest && guest.status) {
            if (guest.status === 'served') acc[date].served++;
            else if (guest.status === 'canceled') acc[date].canceled++;
            else acc[date].waiting++;
          }
        });
      }
      return acc;
    }, {});
  
    const servedData = dates.map(date => filteredData[date].served);
    const canceledData = dates.map(date => filteredData[date].canceled);
    const waitingData = dates.map(date => filteredData[date].waiting);
  
    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Served',
          data: servedData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Canceled',
          data: canceledData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Waiting',
          data: waitingData,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Queue Status Overview: ${queueData.queueName || queueData.name || "undefined"}`,
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Guests',
          },
        },
      },
    };
  
    return <Bar data={chartData} options={options} />;
  };
  
  const StatsCard = ({ title, value }) => {
    const displayValue = value !== undefined && value !== null ? value.toString() : 'N/A';
    return (
      <div className="stats-card">
        <h5>{title}</h5>
        <p>{displayValue}</p>
      </div>
    );
  };
  
  export { LineChart, BarChart, StatsCard };