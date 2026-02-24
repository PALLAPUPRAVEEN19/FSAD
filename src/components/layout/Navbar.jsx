import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import './Navbar.css';

const Navbar = ({ tabs, activeTab, onTabChange, title, subtitle }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New booking request', time: '5m ago', unread: true },
    { id: 2, title: 'Payment received', time: '2h ago', unread: true },
    { id: 3, title: 'Review posted', time: '1d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h2 className="navbar-logo">{title || 'ServiceHub'}</h2>
          {tabs && tabs.length > 0 && (
            <div className="navbar-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`navbar-tab ${activeTab === tab ? 'navbar-tab-active' : ''}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="navbar-tab-indicator"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-right">
          {/* Notifications */}
          <div className="navbar-notification-wrapper">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="navbar-icon-btn"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="navbar-notification-badge">{unreadCount}</span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="navbar-dropdown"
                >
                  <h4 className="navbar-dropdown-title">Notifications</h4>
                  <div className="navbar-dropdown-list">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`navbar-dropdown-item ${notif.unread ? 'unread' : ''}`}
                      >
                        <p className="navbar-dropdown-item-title">{notif.title}</p>
                        <p className="navbar-dropdown-item-time">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="navbar-divider" />

          {/* User profile */}
          <div className="navbar-profile">
            <div className="navbar-profile-info">
              <p className="navbar-profile-name">{user?.fullName}</p>
              <StatusBadge variant="success" size="sm">
                {user?.role === 'professional' ? 'Verified Pro' : user?.role}
              </StatusBadge>
            </div>
            <img
              src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.email}`}
              alt={user?.fullName}
              className="navbar-avatar"
            />
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
