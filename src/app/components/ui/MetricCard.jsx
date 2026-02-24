import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { GlassCard } from "./GlassCard";

export const MetricCard = ({
  label,
  value,
  trend,
  trendDirection = "up",
  color = "indigo",
  icon,
  onClick,
  subtitle
}) => {
  const colorClasses = {
    indigo: {
      text: "text-indigo-600",
      bg: "bg-indigo-50",
      gradient: "from-indigo-500 to-indigo-600"
    },
    emerald: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      gradient: "from-emerald-500 to-emerald-600"
    },
    amber: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      gradient: "from-amber-500 to-amber-600"
    },
    rose: {
      text: "text-rose-600",
      bg: "bg-rose-50",
      gradient: "from-rose-500 to-rose-600"
    },
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-blue-600"
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      gradient: "from-purple-500 to-purple-600"
    }
  };

  const colors = colorClasses[color] || colorClasses.indigo;

  return (
    <GlassCard onClick={onClick} className="relative overflow-hidden group">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {label}
          </p>

          {icon && (
            <div className={`${colors.bg} ${colors.text} p-2 rounded-xl`}>
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className={`text-3xl font-black ${colors.text} mb-1`}
            >
              {value}
            </motion.h2>

            {subtitle && (
              <p className="text-xs text-slate-500 font-semibold">
                {subtitle}
              </p>
            )}
          </div>

          {trend && (
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl ${
                trendDirection === "up"
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-rose-600 bg-rose-50"
              }`}
            >
              {trendDirection === "up" ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {trend}
            </motion.div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};