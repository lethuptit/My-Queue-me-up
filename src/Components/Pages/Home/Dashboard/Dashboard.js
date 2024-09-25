// src/Components/Pages/Home/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../../../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { SelectDateRange } from '../../../../utils';
import { filterDataByDateRange } from '../../../../utils/filterDataByDateRange';
import { BarChart, LineChart, StatsCard } from './Analytics';
import Select from 'react-select';
import { getLoggedInUserEmail } from '../../../../FirebaseConfig';
import './Dashboard.css';
import Toast from '../../../common/Toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQueues, setSelectedQueues] = useState([]);
  const [selectedQueueForBarChart, setSelectedQueueForBarChart] = useState(null);
  const [selectedQueuesForLineChart, setSelectedQueuesForLineChart] = useState([]);
  const [selectedQueueForStats, setSelectedQueueForStats] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
  });
  const [hostEmail, setHostEmail] = useState(null);

  const queueOptions = data
    ? Object.entries(data).map(([queueId, queue]) => ({
      value: queueId,
      label: queue.queueName || queue.name || 'undefined'
    }))
    : [];
  const queueOptionsForStats = [
    { value: 'all', label: 'All Queues' },
    ...Object.entries(data || {}).map(([queueId, queue]) => ({
      value: queueId,
      label: queue.queueName || queue.name || 'undefined',
    }))
  ];


  useEffect(() => {
    const fetchHostEmail = async () => {
      try{
      const email = await getLoggedInUserEmail();
      setHostEmail(email);
      }catch(err){
        setHostEmail(null);
      }
    };
      fetchHostEmail();
  }, []);

  useEffect(() => {
    if (hostEmail) {
      fetchData();
    }
  }, [hostEmail, dateRange]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const dbRef = ref(db, 'queues');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const fetchedData = snapshot.val();
        const filteredByHost = Object.entries(fetchedData).reduce((acc, [queueId, queueData]) => {
          if (queueData.hostId === hostEmail) {
            acc[queueId] = queueData;
          }
          return acc;
        }, {});
        setData(filteredByHost);
        if (!selectedQueueForBarChart && Object.keys(filteredByHost).length > 0) {
          setSelectedQueueForBarChart(Object.keys(filteredByHost)[0]);
        }
        const filtered = filterDataByDateRange(filteredByHost, dateRange.startDate, dateRange.endDate);
        setFilteredData(filtered);
      } else {
        console.log("No data available");
        setData({});
        setFilteredData({});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({});
      setFilteredData({});
    }
    setIsLoading(false);
  };
  const handleQueueSelectionForLineChart = (selectedOptions) => {
    const selectedQueueIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedQueuesForLineChart(selectedQueueIds);
  };

  const handleFilterChange = (startDate, endDate) => {
    console.log('Date range changed:', startDate, endDate);
    setDateRange({ startDate, endDate });
    fetchData();
  };

  const handleQueueSelectionForBarChart = (selectedOption) => {
    setSelectedQueueForBarChart(selectedOption ? selectedOption.value : null);
  };

  const handleQueueSelectionForStats = (selectedOption) => {
    setSelectedQueueForStats(selectedOption ? selectedOption.value : 'all');
  };

  const getStatsForSelectedQueue = () => {
    if (!filteredData) return { guestsServed: 0, averageWaitTime: 0, canceledGuests: 0, waitingGuests: 0 };

    let queueData = [];
    if (selectedQueueForStats === 'all') {
      queueData = Object.values(filteredData || {});
    } else if (filteredData[selectedQueueForStats]) {
      queueData = [filteredData[selectedQueueForStats]];
    }

    const stats = queueData.reduce((acc, queue) => {
      if (queue && typeof queue === 'object' && queue.daily_stats) {
        Object.values(queue.daily_stats).forEach(dayData => {
          if (dayData && typeof dayData === 'object' && dayData.guests) {
            Object.values(dayData.guests).forEach(guest => {
              if (guest && typeof guest === 'object') {
                if (guest.status === 'served') acc.guestsServed++;
                else if (guest.status === 'canceled') acc.canceledGuests++;
                else acc.waitingGuests++;

                if (typeof guest.waitTime === 'number' && guest.waitTime > 0) {
                  acc.totalWaitTime += guest.waitTime;
                  acc.totalGuestsWithWaitTime++;
                }
              }
            });
          }
        });
      }
      return acc;
    }, { guestsServed: 0, canceledGuests: 0, waitingGuests: 0, totalWaitTime: 0, totalGuestsWithWaitTime: 0 });

    stats.averageWaitTime = stats.totalGuestsWithWaitTime > 0
      ? Math.round(stats.totalWaitTime / stats.totalGuestsWithWaitTime)
      : 0;

    return stats;
  };

  const stats = getStatsForSelectedQueue();

  if (!hostEmail)
    return (<Toast
    title="Temporary warning!"
    subTitle="Please sign up to work on this page."
  />)

  return (
    <div className="dashboard-container">
  <div className="dashboard-content">
    <h4>Analytics Dashboard</h4><br></br>
    <SelectDateRange onFilterChange={handleFilterChange} /><br></br>
    {isLoading && <p>Loading...</p>}

    {!isLoading && data && filteredData && Object.keys(data).length > 0 && (
      <>
        <div>
          <div className="chart-header">
            <h6>Select Queue for Statistics:</h6>
            <Select
              options={queueOptionsForStats}
              value={queueOptionsForStats.find(option => option.value === selectedQueueForStats)}
              onChange={handleQueueSelectionForStats}
              className="queue-select"
              placeholder="Select Queue for Statistics"
            />
          </div>

          <div className="stats-cards-container">
            <StatsCard title="Guests Served" value={stats.guestsServed} className="stats-card"/>
            <StatsCard title="Average Wait Time" value={`${stats.averageWaitTime} mins`} className="stats-card"/>
            <StatsCard title="Guests Canceled" value={stats.canceledGuests} className="stats-card"/>
            <StatsCard title="Guests Waiting" value={stats.waitingGuests} className="stats-card"/>
          </div>
        </div><br></br><hr></hr>

        <div className='line-chart'>
          <div className="chart-header">
            <h6>Select Queues for Line Chart:</h6>
            <Select
              isMulti
              options={queueOptions}
              value={queueOptions.filter(option => selectedQueuesForLineChart.includes(option.value))}
              onChange={handleQueueSelectionForLineChart}
              className="queue-select"
              placeholder="Select Queues for Line Chart"
            />
          </div>

          {filteredData && (
            <LineChart 
              data={filteredData} 
              selectedQueues={selectedQueuesForLineChart.length > 0 ? selectedQueuesForLineChart : Object.keys(data)}
              dateRange={dateRange}
              className="line-chart-container"
            />
          )}
        </div><br></br><hr></hr>

        <div className='bar-chart'>
          <div className="chart-header">
            <h6>Select Queue for Bar Chart:</h6>
            <Select
              options={queueOptions}
              value={queueOptions.find(option => option.value === selectedQueueForBarChart)}
              onChange={handleQueueSelectionForBarChart}
              className="queue-select"
              placeholder="Select Queues for Bar Chart"
            />
          </div>

          {selectedQueueForBarChart && filteredData && (
            <BarChart 
              data={filteredData}
              selectedQueue={selectedQueueForBarChart}
              dateRange={dateRange}
              className="bar-chart-container"
            />
          )}
        </div>
      </>
    )}

    {!isLoading && (!data || !filteredData || Object.keys(data).length === 0) && (
      <p>
        No data available. Analytics will appear once the queue is populated. Start creating your queue by 
        <button className="create-queue-button" onClick={() => navigate('/dashboard/queue/create')}>Click here</button>
      </p>
  )}
  </div>
</div>
  );
};


export default Dashboard;

















