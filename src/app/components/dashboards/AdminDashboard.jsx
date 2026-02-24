import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Settings,
  LogOut,
  Lock,
  Database,
  Server
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { GlassCard } from "../ui/GlassCard";
import { MetricCard } from "../ui/MetricCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { toast } from "sonner";

const platformData = [
  { date: "Feb 16", users: 1200, revenue: 8000, transactions: 1240 },
  { date: "Feb 17", users: 1350, revenue: 9200, transactions: 1350 },
  { date: "Feb 18", users: 1420, revenue: 9800, transactions: 1420 },
  { date: "Feb 19", users: 1580, revenue: 11000, transactions: 1580 },
  { date: "Feb 20", users: 1640, revenue: 12400, transactions: 1640 },
  { date: "Feb 21", users: 1720, revenue: 13100, transactions: 1720 },
  { date: "Feb 22", users: 1850, revenue: 14500, transactions: 1850 }
];

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");

  const handleSecurityAction = (action) => {
    toast.success("Security Action", {
      description: `${action} executed successfully`
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Platform Command Center 🎯
          </h1>
          <p className="text-slate-600 font-semibold">
            All systems operational • Real-time monitoring active
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Database size={18} />}
          onClick={() => toast.info("Backup started")}
        >
          Backup System
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Revenue"
          value="$2.4M"
          trend="+12.5%"
          color="emerald"
          icon={<DollarSign size={20} />}
        />
        <MetricCard
          label="Active Users"
          value="15,284"
          trend="+8.3%"
          color="blue"
          icon={<Users size={20} />}
        />
        <MetricCard
          label="Platform Health"
          value="99.98%"
          color="purple"
          icon={<Activity size={20} />}
        />
        <MetricCard
          label="Security Score"
          value="A+"
          color="amber"
          icon={<Shield size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <GlassCard>
          <h3 className="text-xl font-black mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-black mb-6">Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">

      <h2 className="text-3xl font-black">User Management</h2>

      <div className="grid grid-cols-4 gap-6">
        <MetricCard label="Total Users" value="15,284" icon={<Users size={20} />} />
        <MetricCard label="Professionals" value="3,847" icon={<Shield size={20} />} />
        <MetricCard label="Active Today" value="8,429" icon={<Activity size={20} />} />
        <MetricCard label="Verified" value="92%" icon={<CheckCircle size={20} />} />
      </div>

      <GlassCard>
        <h3 className="text-xl font-black mb-6">Recent Users</h3>

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between p-3 border-b">
            <span>User {1000 + i}</span>
            <Badge>Active</Badge>
          </div>
        ))}

      </GlassCard>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Users":
        return renderUsers();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="h-20 bg-white border-b flex items-center justify-between px-8">
        <h2 className="text-2xl font-black">Admin Hub</h2>

        <div className="flex gap-6">
          {["Overview", "Users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-bold ${
                activeTab === tab ? "text-indigo-600" : "text-gray-500"
              }`}
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