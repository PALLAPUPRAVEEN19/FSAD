import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LogOut,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Award,
  TrendingUp,
  BookmarkPlus,
  MessageSquare,
  Video,
  Shield
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { SearchInput } from "../ui/SearchInput";
import { mockSpecialists, categories } from "../../data/mockData";
import { toast } from "sonner";

export const UserDashboard = () => {
  const { user, logout } = useAuth();

  const [activeView, setActiveView] = useState("Specialists");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSpecialists = useMemo(() => {
    return mockSpecialists
      .filter((s) => {
        const matchesCategory =
          activeCategory === "All" || s.category === activeCategory;

        const matchesSearch =
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.role.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price") return a.hourlyRate - b.hourlyRate;
        if (sortBy === "experience") return b.yearsExperience - a.yearsExperience;
        return 0;
      });
  }, [search, activeCategory, sortBy]);

  const handleBook = (name) => {
    toast.success("Booking sent", {
      description: `${name} will respond soon`
    });
  };

  const SpecialistCard = ({ specialist }) => (
    <GlassCard>
      <div className="flex gap-6">
        <img
          src={specialist.img}
          alt={specialist.name}
          className="w-24 h-24 rounded-xl object-cover"
        />

        <div className="flex-1">
          <h3 className="font-bold text-lg">{specialist.name}</h3>
          <p className="text-sm text-gray-500">{specialist.role}</p>

          <div className="flex gap-2 mt-2">
            <Badge>{specialist.category}</Badge>
            <Badge>
              <MapPin size={12} /> {specialist.location}
            </Badge>
          </div>

          <div className="flex gap-6 mt-3 text-sm">
            <span className="flex items-center gap-1">
              <Star size={14} /> {specialist.rating}
            </span>

            <span className="flex items-center gap-1">
              <DollarSign size={14} /> ${specialist.hourlyRate}/hr
            </span>

            <span className="flex items-center gap-1">
              <Clock size={14} /> {specialist.responseTime}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              icon={<MessageSquare size={14} />}
              onClick={() => toast.info("Opening chat")}
            >
              Message
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={<Video size={14} />}
              onClick={() => handleBook(specialist.name)}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}
      <nav className="h-20 bg-white border-b flex items-center justify-between px-8">
        <h2 className="text-2xl font-black">ServiceHub</h2>

        <div className="flex gap-6">
          {["Specialists", "Saved", "My Bookings"].map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={
                activeView === v
                  ? "text-orange-600 font-bold"
                  : "text-gray-500"
              }
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-bold">{user?.fullName}</span>

          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* CATEGORY BAR */}
      <div className="p-4 flex gap-3 overflow-x-auto border-b bg-white">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={
              activeCategory === c
                ? "bg-orange-600 text-white px-3 py-1 rounded-lg"
                : "bg-gray-100 px-3 py-1 rounded-lg"
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-8">

        <div className="flex justify-between mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search specialists..."
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="rating">Top Rated</option>
            <option value="price">Lowest Price</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeView === "Specialists" && (
              <div className="grid gap-6">
                {filteredSpecialists.map((s) => (
                  <SpecialistCard key={s.id} specialist={s} />
                ))}
              </div>
            )}

            {activeView === "Saved" && (
              <GlassCard className="text-center py-20">
                No saved professionals
              </GlassCard>
            )}

            {activeView === "My Bookings" && (
              <GlassCard className="text-center py-20">
                No bookings yet
              </GlassCard>
            )}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
};