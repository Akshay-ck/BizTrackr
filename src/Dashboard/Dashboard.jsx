import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">BizTrackr</h2>
        <ul className="menu">
          <li className="menu-item active">Dashboard</li>
          <li className="menu-item" onClick={() => navigate('/sales')}>Sales</li>
          <li className="menu-item">Income</li>
          <li className="menu-item">Expenses</li>
          <li className="menu-item">Reports</li>
          <li className="menu-item">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1 className="content-title">Dashboard Overview</h1>

        <div className="analytics">
          <div className="card">
            <h3>Total Income</h3>
            <p>₹1,20,000</p>
          </div>
          <div className="card">
            <h3>Total Expenses</h3>
            <p>₹45,000</p>
          </div>
          <div className="card">
            <h3>Balance</h3>
            <p>₹75,000</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
