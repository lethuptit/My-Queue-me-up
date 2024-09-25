import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard/Dashboard';
import QueueCreate from './QueueManagement/QueueCreate';
import QueueList from './QueueManagement/QueueList';
import QueueMonitorView from './QueueMonitor/QueueMonitor';

const DashboardHome = () => {
  return (
      <div className="dashboard-layout">
        <Sidebar />  
        <div className="dashboard-routes">     
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="queue/monitor" element={<QueueMonitorView />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="queue/create" element={<QueueCreate />} />
            <Route path="queue/list" element={<QueueList />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </div>
  );
}

export default DashboardHome;
