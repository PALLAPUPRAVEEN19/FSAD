import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import StatsCard from '../../components/data-display/StatsCard';
import { Briefcase, DollarSign, Star, TrendingUp } from 'lucide-react';
import './ServiceListing.css';

const ServiceListing = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="service-listing-page">
      <Navbar
        title="ServicePro"
        tabs={['Overview', 'My Jobs', 'Earnings', 'Reviews']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="service-listing-main">
        <div className="service-listing-header">
          <div>
            <h1 className="service-listing-title">Professional Dashboard</h1>
            <p className="service-listing-subtitle">Welcome back! Here's your performance overview.</p>
          </div>
        </div>

        <div className="service-listing-stats">
          <StatsCard
            label="Total Earnings"
            value="$42,580"
            trend="+18%"
            icon={<DollarSign size={20} />}
            color="emerald"
          />
          <StatsCard
            label="Active Projects"
            value="8"
            icon={<Briefcase size={20} />}
            color="indigo"
          />
          <StatsCard
            label="Client Rating"
            value="4.9"
            trend="+0.2"
            icon={<Star size={20} />}
            color="amber"
          />
          <StatsCard
            label="Growth"
            value="+24%"
            icon={<TrendingUp size={20} />}
            color="purple"
          />
        </div>

        <div className="service-listing-placeholder">
          <h3>Professional Dashboard Content</h3>
          <p>View and manage your professional services, bookings, and earnings.</p>
        </div>
      </main>
    </div>
  );
};

export default ServiceListing;
