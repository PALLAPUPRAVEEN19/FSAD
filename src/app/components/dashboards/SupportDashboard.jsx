import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  FileText,
  TrendingUp,
  Activity
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { GlassCard } from "../ui/GlassCard";
import { MetricCard } from "../ui/MetricCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { mockTickets } from "../../data/mockData";
import { toast } from "sonner";

export const SupportDashboard = () => {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("Tickets");
  const [filter, setFilter] = useState("all");

  const filteredTickets = mockTickets.filter((ticket) => {
    if (filter === "all") return true;
    if (filter === "open") return ticket.status === "Open";
    if (filter === "progress") return ticket.status === "In Progress";
    if (filter === "resolved") return ticket.status === "Resolved";
    return true;
  });

  const handleTicketAction = (ticketId, action) => {
    toast.success(`Ticket ${action}`, {
      description: `Ticket ${ticketId} ${action}`
    });
  };

  const renderTickets = () => (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900">Support Queue</h2>

        <div className="flex gap-2">
          {["all", "open", "progress", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? "px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  : "px-4 py-2 bg-white border rounded-xl text-xs font-bold"
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTickets.map((ticket) => (
          <GlassCard key={ticket.id}>

            <div className="flex items-start gap-4">

              <img
                src={ticket.userAvatar}
                alt={ticket.user}
                className="w-12 h-12 rounded-xl"
              />

              <div className="flex-1">

                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold">{ticket.id}</span>

                  <Badge>{ticket.status}</Badge>

                  <Badge variant="neutral">{ticket.priority}</Badge>
                </div>

                <h4 className="font-bold">{ticket.issue}</h4>

                <p className="text-sm text-gray-500 mb-3">
                  {ticket.description}
                </p>

                <div className="flex gap-2 pt-3 border-t">

                  <Button
                    size="sm"
                    icon={<MessageSquare size={14} />}
                    onClick={() =>
                      handleTicketAction(ticket.id, "responded to")
                    }
                  >
                    Respond
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    icon={<CheckCircle size={14} />}
                    onClick={() => handleTicketAction(ticket.id, "resolved")}
                  >
                    Resolve
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<AlertTriangle size={14} />}
                    onClick={() => handleTicketAction(ticket.id, "escalated")}
                  >
                    Escalate
                  </Button>

                </div>

              </div>
            </div>

          </GlassCard>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <GlassCard className="text-center py-20">
          <CheckCircle size={40} className="mx-auto mb-4 text-green-500" />
          <p>No tickets here</p>
        </GlassCard>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">

      <h2 className="text-3xl font-black">Support Analytics</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <MetricCard
          label="Resolution Rate"
          value="98.5%"
          icon={<CheckCircle size={20} />}
        />

        <MetricCard
          label="Avg Response Time"
          value="14m"
          icon={<Clock size={20} />}
        />

        <MetricCard
          label="Customer Satisfaction"
          value="4.8/5"
          icon={<TrendingUp size={20} />}
        />

        <MetricCard
          label="Active Tickets"
          value="23"
          icon={<Activity size={20} />}
        />

      </div>

    </div>
  );

  const renderContent = () => {
    if (activeTab === "Analytics") return renderAnalytics();

    if (activeTab === "Knowledge Base") {
      return (
        <GlassCard className="text-center py-20">
          <FileText size={40} className="mx-auto mb-4 text-gray-400" />
          <p>Knowledge Base coming soon</p>
        </GlassCard>
      );
    }

    return renderTickets();
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="h-20 bg-white border-b flex items-center justify-between px-8">

        <h2 className="text-2xl font-black">SupportDesk</h2>

        <div className="flex gap-6">
          {["Tickets", "Analytics", "Knowledge Base"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "text-indigo-600 font-bold"
                  : "text-gray-500"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">

          <span className="font-bold">{user?.fullName}</span>

          <Button
            variant="danger"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={logout}
          >
            Logout
          </Button>

        </div>

      </nav>

      <main className="max-w-7xl mx-auto p-8">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

      </main>

    </div>
  );
};