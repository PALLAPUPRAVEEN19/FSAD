import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Wallet,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
  Bell,
  LogOut
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import { GlassCard } from "../ui/GlassCard";
import { MetricCard } from "../ui/MetricCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

import {
  mockJobs,
  mockEarningsData,
  mockReviews,
  mockNotifications
} from "../../data/mockData";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { toast } from "sonner";

export const ProfessionalDashboard = () => {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("Overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const tabs = ["Overview", "My Jobs", "Earnings", "Reviews"];

  const handleJobAction = (jobId, action) => {
    toast.success(`Job ${action}`, {
      description: `Successfully ${action} job ${jobId}`
    });
  };

  /* -------------------- OVERVIEW -------------------- */

  const renderOverview = () => (
    <div className="space-y-6">

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Welcome back, {user?.fullName?.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-600 font-semibold">
            You have 3 active projects
          </p>
        </div>

        <Button icon={<Briefcase size={16} />}>
          New Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <MetricCard
          label="Total Earnings"
          value="$42,580"
          trend="+18%"
          color="emerald"
          icon={<DollarSign size={18} />}
        />

        <MetricCard
          label="Active Projects"
          value="8"
          icon={<Briefcase size={18} />}
        />

        <MetricCard
          label="Rating"
          value="4.9"
          icon={<Star size={18} />}
          color="amber"
        />

        <MetricCard
          label="Response Time"
          value="< 2h"
          icon={<Clock size={18} />}
        />

      </div>

      <GlassCard>

        <h3 className="text-xl font-black mb-6">
          Active Projects
        </h3>

        <div className="space-y-3">

          {mockJobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl border bg-slate-50 flex justify-between"
            >
              <div>
                <p className="font-bold">{job.title}</p>
                <p className="text-sm text-slate-500">
                  {job.client}
                </p>
              </div>

              <Badge>{job.status}</Badge>
            </div>
          ))}

        </div>

      </GlassCard>

    </div>
  );

  /* -------------------- JOBS -------------------- */

  const renderJobs = () => (
    <div className="space-y-6">

      <h2 className="text-3xl font-black">My Projects</h2>

      <div className="grid gap-6">

        {mockJobs.map((job) => (
          <GlassCard key={job.id}>

            <div className="flex justify-between">

              <div>
                <h3 className="font-bold text-lg">
                  {job.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {job.client}
                </p>
              </div>

              <Badge>{job.status}</Badge>

            </div>

            <div className="mt-4 flex gap-2">

              <Button
                size="sm"
                onClick={() =>
                  handleJobAction(job.id, "updated")
                }
              >
                Update
              </Button>

              <Button
                variant="outline"
                size="sm"
              >
                Message
              </Button>

            </div>

          </GlassCard>
        ))}

      </div>

    </div>
  );

  /* -------------------- EARNINGS -------------------- */

  const renderEarnings = () => (
    <div className="space-y-6">

      <h2 className="text-3xl font-black">
        Earnings Analytics
      </h2>

      <GlassCard>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockEarningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </GlassCard>

      <GlassCard>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockEarningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="projects"
              fill="#6366f1"
            />
          </BarChart>
        </ResponsiveContainer>

      </GlassCard>

    </div>
  );

  /* -------------------- REVIEWS -------------------- */

  const renderReviews = () => (
    <div className="space-y-6">

      <h2 className="text-3xl font-black">
        Client Reviews
      </h2>

      {mockReviews.map((review) => (
        <GlassCard key={review.id}>

          <div className="flex justify-between">

            <div>
              <p className="font-bold">
                {review.client}
              </p>

              <p className="text-sm text-slate-500">
                {review.project}
              </p>
            </div>

            <Badge>{review.rating} ⭐</Badge>

          </div>

          <p className="mt-3 text-slate-700">
            {review.comment}
          </p>

        </GlassCard>
      ))}

    </div>
  );

  const renderContent = () => {
    if (activeTab === "My Jobs") return renderJobs();
    if (activeTab === "Earnings") return renderEarnings();
    if (activeTab === "Reviews") return renderReviews();
    return renderOverview();
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}

      <nav className="h-20 bg-white border-b flex items-center justify-between px-8">

        <h2 className="text-2xl font-black">
          ServicePro
        </h2>

        <div className="flex gap-6">

          {tabs.map((tab) => (
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

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            <Bell size={20} />
          </button>

          <span className="font-bold">
            {user?.fullName}
          </span>

          <Button
            size="sm"
            variant="ghost"
            icon={<LogOut size={16} />}
            onClick={logout}
          >
            Logout
          </Button>

        </div>

      </nav>

      {/* CONTENT */}

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