import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import ProfessionalCard from '../../components/data-display/ProfessionalCard';
import './BrowseProfessionals.css';

const BrowseProfessionals = () => {
  const [activeTab, setActiveTab] = useState('Browse');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Design', 'Development', 'Marketing', 'Management'];

  const professionals = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      role: 'Senior UX Architect',
      category: 'Design',
      rating: 4.9,
      reviews: 247,
      hourlyRate: 150,
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      skills: ['UI/UX Design', 'User Research', 'Prototyping'],
      verified: true
    },
    {
      id: 2,
      name: 'Rajesh Patel',
      role: 'Full Stack Developer',
      category: 'Development',
      rating: 4.8,
      reviews: 189,
      hourlyRate: 130,
      avatar: 'https://i.pravatar.cc/150?u=rajesh',
      skills: ['React', 'Node.js', 'AWS'],
      verified: true
    },
    {
      id: 3,
      name: 'Maria Garcia',
      role: 'Growth Marketer',
      category: 'Marketing',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 120,
      avatar: 'https://i.pravatar.cc/150?u=maria',
      skills: ['SEO/SEM', 'Analytics', 'Content Strategy'],
      verified: true
    }
  ];

  const filteredProfessionals = professionals.filter(pro => {
    const matchesCategory = category === 'All' || pro.category === category;
    const matchesSearch = pro.name.toLowerCase().includes(search.toLowerCase()) ||
                         pro.role.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="browse-page">
      <Navbar
        title="ServiceHub"
        tabs={['Browse', 'Saved', 'Bookings']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Category bar */}
      <div className="browse-category-bar">
        <div className="browse-category-container">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`browse-category-btn ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="browse-main">
        <div className="browse-header">
          <div>
            <h1 className="browse-title">Discover Top Professionals</h1>
            <p className="browse-subtitle">
              {filteredProfessionals.length} {filteredProfessionals.length === 1 ? 'specialist' : 'specialists'} available
            </p>
          </div>

          <div className="browse-search">
            <Search className="browse-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name, skill, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="browse-search-input"
            />
          </div>
        </div>

        <div className="browse-grid">
          {filteredProfessionals.map(pro => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="browse-empty">
            <Search size={48} className="browse-empty-icon" />
            <h3 className="browse-empty-title">No professionals found</h3>
            <p className="browse-empty-text">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseProfessionals;
