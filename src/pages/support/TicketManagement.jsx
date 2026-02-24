import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { MessageSquare, CheckCircle } from 'lucide-react';
import './TicketManagement.css';

const TicketManagement = () => {
  const [activeTab, setActiveTab] = useState('Tickets');

  const tickets = [
    {
      id: 'TKT-1047',
      user: 'Sarah Miller',
      issue: 'Payment gateway timeout error',
      status: 'Open',
      priority: 'Critical',
      time: '3m ago'
    },
    {
      id: 'TKT-1046',
      user: 'David Brown',
      issue: 'KYC Document Verification Failed',
      status: 'In Progress',
      priority: 'High',
      time: '28m ago'
    },
    {
      id: 'TKT-1045',
      user: 'Emma Wilson',
      issue: 'Profile photo upload not working',
      status: 'In Progress',
      priority: 'Medium',
      time: '1h ago'
    }
  ];

  return (
    <div className="ticket-page">
      <Navbar
        title="SupportDesk"
        tabs={['Tickets', 'Analytics', 'Knowledge Base']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="ticket-main">
        <div className="ticket-header">
          <div>
            <h1 className="ticket-title">Support Queue</h1>
            <p className="ticket-subtitle">Manage customer inquiries and issues</p>
          </div>
        </div>

        <div className="ticket-list">
          {tickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-card-header">
                <div className="ticket-card-info">
                  <div className="ticket-card-meta">
                    <span className="ticket-card-id">{ticket.id}</span>
                    <StatusBadge
                      variant={ticket.status === 'Open' ? 'danger' : 'warning'}
                      size="sm"
                      dot
                    >
                      {ticket.status}
                    </StatusBadge>
                    <StatusBadge
                      variant={ticket.priority === 'Critical' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {ticket.priority}
                    </StatusBadge>
                  </div>
                  <h3 className="ticket-card-issue">{ticket.issue}</h3>
                  <p className="ticket-card-details">
                    By {ticket.user} • {ticket.time}
                  </p>
                </div>
              </div>
              <div className="ticket-card-actions">
                <Button variant="primary" size="sm" icon={<MessageSquare size={14} />}>
                  Respond
                </Button>
                <Button variant="outline" size="sm" icon={<CheckCircle size={14} />}>
                  Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TicketManagement;
