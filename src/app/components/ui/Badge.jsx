import React from "react";
import { motion } from "framer-motion";

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  dot = false
}) => {
  const variantClasses = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200"
  };

  const dotColors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-blue-500",
    neutral: "bg-slate-500"
  };

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5"
  };

  const v = variantClasses[variant] ?? variantClasses.neutral;
  const s = sizeClasses[size] ?? sizeClasses.md;
  const d = dotColors[variant] ?? dotColors.neutral;

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center gap-1.5
        ${v}
        ${s}
        border rounded-lg font-bold uppercase tracking-wider
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${d} animate-pulse`} />
      )}

      {children}
    </motion.span>
  );
};