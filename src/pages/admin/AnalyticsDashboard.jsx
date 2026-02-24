import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import StatsCard from '../../components/data-display/StatsCard';
import { DollarSign, Users, Activity, Shield } from 'lucide-react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="admin-page">
      <Navbar
        title="AdminHub"
        tabs={['Overview', 'Security', 'Users', 'Reports']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Platform Command Center 🎯</h1>
            <p className="admin-subtitle">
              <span className="admin-status-dot" />
              All systems operational • Real-time monitoring active
            </p>
          </div>
        </div>

        <div className="admin-stats">
          <StatsCard
            label="Total Revenue"
            value="$2.4M"
            trend="+12.5%"
            icon={<DollarSign size={20} />}
            color="emerald"
          />
          <StatsCard
            label="Active Users"
            value="15,284"
            trend="+8.3%"
            icon={<Users size={20} />}
            color="indigo"
          />
          <StatsCard
            label="Platform Health"
            value="99.98%"
            trend="+0.02%"
            icon={<Activity size={20} />}
            color="purple"
          />
          <StatsCard
            label="Security Score"
            value="A+"
            icon={<Shield size={20} />}
            color="amber"
          />
        </div>

        <div className="admin-placeholder">
          <h3>Admin Analytics Dashboard</h3>
          <p>Monitor platform performance, user activity, and system health.</p>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
