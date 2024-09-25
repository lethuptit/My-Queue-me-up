import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaChartArea, FaAdjust, FaList, FaPlus, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const SidebarItem = ({ to, icon, label }) => {
  return (
    <Nav.Item>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
        }
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div style={{ marginRight: '10px' }}>{icon}</div>
        <span>{label}</span>
      </NavLink>
    </Nav.Item>
  );
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
  };

  return (
    <>
      {/* Toggle button - visible on mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <FaBars />
      </button>

      {/* Sidebar content */}
      <Nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-sticky">
          {/* <SidebarItem to="/" icon={<FaHome />} label="Home" /> */}
          <SidebarItem to="/dashboard" icon={<FaChartArea />} label="Dashboard" />
          <SidebarItem to="/dashboard/queue/create" icon={<FaPlus />} label="Create Queue" />
          <SidebarItem to="/dashboard/queue/list" icon={<FaList />} label="Queue List" />
          <SidebarItem to="/dashboard/queue/monitor" icon={<FaAdjust />} label="Queue Monitors" />
          {/* <MyQueues/> */}
          {/* <SidebarItem to="/users" icon={<FaUsers />} label="Users" /> */}
        </div>
      </Nav>
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;



