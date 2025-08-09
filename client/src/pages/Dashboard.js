import React from 'react';
import { isAuthenticated } from '../api/auth';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = isAuthenticated();

  return (
    <div className="dashboard-container">
      <h2>👋 Welcome, {user.name}!</h2>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role === 'admin' ? 'Admin' : 'User'}</p>
      </div>

      <div className="quick-links">
        <h3>🔗 Quick Links</h3>
        <ul>
            <li><a href="/projects">📁 Manage Projects</a></li>
            <li><a href="/contact">✉️ Edit Contact Info</a></li>
            <li><a href="/services">🧰 My Services</a></li>
            <li><a href="/projects/new">➕ Add New Project</a></li>
            <li><a href="/qualifications">🎓 View Qualifications</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
